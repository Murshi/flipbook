import { useRef, useState, useEffect } from 'react';

type DrawingData = {
  type: 'stroke' | 'circle' | 'rect' | 'line' | 'star';
  points?: { x: number; y: number }[];
  x?: number;
  y?: number;
  x2?: number;
  y2?: number;
  width?: number;
  height?: number;
  radius?: number;
  color: string;
  lineWidth?: number;
};

type DrawingCanvasProps = {
  currentDrawings: DrawingData[];
  previousDrawings: DrawingData[];
  onAddDrawing: (drawing: DrawingData) => void;
  tool: 'pencil' | 'circle' | 'rect' | 'line' | 'star';
  color: string;
  pencilSize: number;
  isPlaying: boolean;
};

export function DrawingCanvas({
  currentDrawings,
  previousDrawings,
  onAddDrawing,
  tool,
  color,
  pencilSize,
  isPlaying
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([]);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [previewShape, setPreviewShape] = useState<DrawingData | null>(null);

  useEffect(() => {
    redrawCanvas();
  }, [currentDrawings, previousDrawings, currentStroke, previewShape]);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw previous frame (onion skin) at 20% opacity
    if (previousDrawings.length > 0) {
      ctx.globalAlpha = 0.2;
      previousDrawings.forEach(drawing => {
        drawShape(ctx, drawing);
      });
      ctx.globalAlpha = 1.0;
    }

    // Draw current frame
    currentDrawings.forEach(drawing => {
      drawShape(ctx, drawing);
    });

    // Draw current stroke (while drawing)
    if (currentStroke.length > 0) {
      ctx.strokeStyle = color;
      ctx.lineWidth = pencilSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(currentStroke[0].x, currentStroke[0].y);
      currentStroke.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    }

    // Draw preview shape
    if (previewShape) {
      drawShape(ctx, previewShape);
    }
  };

  const drawShape = (ctx: CanvasRenderingContext2D, drawing: DrawingData) => {
    ctx.strokeStyle = drawing.color;
    ctx.fillStyle = drawing.color;
    ctx.lineWidth = drawing.lineWidth || 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (drawing.type === 'stroke' && drawing.points) {
      ctx.beginPath();
      if (drawing.points.length > 0) {
        ctx.moveTo(drawing.points[0].x, drawing.points[0].y);
        drawing.points.forEach(point => {
          ctx.lineTo(point.x, point.y);
        });
      }
      ctx.stroke();
    } else if (drawing.type === 'rect' && drawing.x !== undefined && drawing.y !== undefined && drawing.width && drawing.height) {
      ctx.strokeRect(drawing.x, drawing.y, drawing.width, drawing.height);
    } else if (drawing.type === 'circle' && drawing.x !== undefined && drawing.y !== undefined && drawing.radius) {
      ctx.beginPath();
      ctx.arc(drawing.x, drawing.y, drawing.radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (drawing.type === 'line' && drawing.x !== undefined && drawing.y !== undefined && drawing.x2 !== undefined && drawing.y2 !== undefined) {
      ctx.beginPath();
      ctx.moveTo(drawing.x, drawing.y);
      ctx.lineTo(drawing.x2, drawing.y2);
      ctx.stroke();
    } else if (drawing.type === 'star' && drawing.x !== undefined && drawing.y !== undefined && drawing.radius) {
      drawStar(ctx, drawing.x, drawing.y, drawing.radius);
    }
  };

  const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number) => {
    const spikes = 5;
    const outerRadius = radius;
    const innerRadius = radius * 0.5;
    let rotation = -Math.PI / 2;
    
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = rotation + (i * Math.PI / spikes);
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.stroke();
  };

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0]?.clientX || 0;
      clientY = e.touches[0]?.clientY || 0;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isPlaying) return;
    
    e.preventDefault();
    const point = getCanvasCoordinates(e);
    setIsDrawing(true);
    setStartPoint(point);

    if (tool === 'pencil') {
      setCurrentStroke([point]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isPlaying) return;
    
    e.preventDefault();
    const point = getCanvasCoordinates(e);

    if (tool === 'pencil') {
      setCurrentStroke(prev => [...prev, point]);
    } else if (tool === 'rect' && startPoint) {
      const width = point.x - startPoint.x;
      const height = point.y - startPoint.y;
      setPreviewShape({
        type: 'rect',
        x: startPoint.x,
        y: startPoint.y,
        width,
        height,
        color
      });
    } else if (tool === 'circle' && startPoint) {
      const radius = Math.sqrt(
        Math.pow(point.x - startPoint.x, 2) + Math.pow(point.y - startPoint.y, 2)
      );
      setPreviewShape({
        type: 'circle',
        x: startPoint.x,
        y: startPoint.y,
        radius,
        color
      });
    } else if (tool === 'line' && startPoint) {
      setPreviewShape({
        type: 'line',
        x: startPoint.x,
        y: startPoint.y,
        x2: point.x,
        y2: point.y,
        color
      });
    } else if (tool === 'star' && startPoint) {
      const radius = Math.sqrt(
        Math.pow(point.x - startPoint.x, 2) + Math.pow(point.y - startPoint.y, 2)
      );
      setPreviewShape({
        type: 'star',
        x: startPoint.x,
        y: startPoint.y,
        radius,
        color
      });
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing || isPlaying) return;

    if (tool === 'pencil' && currentStroke.length > 0) {
      onAddDrawing({
        type: 'stroke',
        points: currentStroke,
        color,
        lineWidth: pencilSize
      });
      setCurrentStroke([]);
    } else if (previewShape) {
      onAddDrawing(previewShape);
      setPreviewShape(null);
    }

    setIsDrawing(false);
    setStartPoint(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={422}
      height={270}
      className="w-full h-full cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    />
  );
}