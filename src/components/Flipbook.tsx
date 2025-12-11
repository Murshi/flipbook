import { useState, useRef, useEffect } from 'react';
import svgPaths from "../imports/svg-04ebdkrq32";
import stopSvgPaths from "../imports/svg-wpf9vxyrc3";
import clsx from "clsx";
import { DrawingCanvas } from './DrawingCanvas';

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

const ANIMATION_SPEED = 400; // milliseconds per frame

type Icons8Next1Props = {
  additionalClassNames?: string;
  onClick?: () => void;
  disabled?: boolean;
};

function Icons8Next1({ children, additionalClassNames = "", onClick, disabled }: React.PropsWithChildren<Icons8Next1Props>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx("relative rounded-[20px] shrink-0 disabled:opacity-30 hover:opacity-80 transition-opacity", additionalClassNames)}
    >
      <div className="content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[inherit]">{children}</div>
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0.714px] border-solid inset-0 pointer-events-none rounded-[20px]" />
    </button>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[15px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        {children}
      </svg>
    </div>
  );
}

type Icons8NextProps = {
  additionalClassNames?: string;
  onClick?: () => void;
  disabled?: boolean;
};

function Icons8Next({ children, additionalClassNames = "", onClick, disabled }: React.PropsWithChildren<Icons8NextProps>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx("relative size-[40px] disabled:opacity-30 hover:scale-105 transition-transform active:scale-95", additionalClassNames)}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        {children}
      </svg>
    </button>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[15px] relative shrink-0 w-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 15">
        <g id="Frame 6">{children}</g>
      </svg>
    </div>
  );
}

type Frame10HelperProps = {
  additionalClassNames?: string;
};

function Frame10Helper({ children, additionalClassNames = "" }: React.PropsWithChildren<Frame10HelperProps>) {
  return (
    <div className={clsx("absolute h-[269px] top-px w-0", additionalClassNames)}>
      <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 269">
          {children}
        </svg>
      </div>
    </div>
  );
}

export function Flipbook() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [frames, setFrames] = useState<DrawingData[][]>([[]]);
  const [tool, setTool] = useState<'pencil' | 'circle' | 'rect' | 'line' | 'star'>('pencil');
  const [color, setColor] = useState('#475467');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flippingFrameDrawings, setFlippingFrameDrawings] = useState<DrawingData[]>([]);
  const [pencilSize, setPencilSize] = useState(2);
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const colors = [
    '#475467', // Gray
    '#000000', // Black
    '#EF4444', // Red
    '#F97316', // Orange
    '#EAB308', // Yellow
    '#22C55E', // Green
    '#3B82F6', // Blue
    '#A855F7', // Purple
    '#EC4899', // Pink
  ];

  const addDrawing = (drawing: DrawingData) => {
    setFrames(prevFrames => {
      const newFrames = [...prevFrames];
      newFrames[currentFrame] = [...newFrames[currentFrame], drawing];
      return newFrames;
    });
  };

  const undo = () => {
    setFrames(prevFrames => {
      const newFrames = [...prevFrames];
      if (newFrames[currentFrame].length > 0) {
        newFrames[currentFrame] = newFrames[currentFrame].slice(0, -1);
      }
      return newFrames;
    });
  };

  const goToPreviousFrame = () => {
    if (currentFrame > 0) {
      setCurrentFrame(currentFrame - 1);
    }
  };

  const goToNextFrame = () => {
    // Add new frame if we're at the last one
    if (currentFrame === frames.length - 1) {
      setFrames(prevFrames => [...prevFrames, []]);
    }
    
    // Change frame immediately
    setCurrentFrame(currentFrame + 1);
  };

  const increasePencilSize = () => {
    setPencilSize(prev => Math.min(prev + 1, 10));
  };

  const decreasePencilSize = () => {
    setPencilSize(prev => Math.max(prev - 1, 1));
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const cycleSpeed = () => {
    setPlaybackSpeed(prev => {
      if (prev === 1) return 2;
      if (prev === 2) return 3;
      if (prev === 3) return 0.5;
      return 1;
    });
  };

  useEffect(() => {
    if (isPlaying) {
      let frameIndex = 0;
      const totalFrames = frames.length;
      playbackIntervalRef.current = setInterval(() => {
        setCurrentFrame(frameIndex);
        frameIndex = (frameIndex + 1) % totalFrames;
      }, ANIMATION_SPEED / playbackSpeed);
    } else {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
        playbackIntervalRef.current = null;
      }
    }

    return () => {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, frames.length]);

  const currentFrameDrawings = frames[currentFrame] || [];
  const previousFrameDrawings = currentFrame > 0 ? frames[currentFrame - 1] : [];

  return (
    <div className="bg-gradient-to-b from-[#e4e7ec] to-[#cbcbcb] relative rounded-[24px] w-full max-w-[468px]">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] py-[20px] relative size-full">
          {/* Top Header */}
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <p className="font-['Delicious_Handrawn',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#344054] text-[18px] text-nowrap whitespace-pre">
              Flip book
            </p>
            <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
              <button
                onClick={togglePlayback}
                className={clsx(
                  "content-stretch flex gap-[6px] items-center px-[12px] py-[8px] relative rounded-[24px] shrink-0 transition-colors active:scale-95",
                  isPlaying ? "bg-white hover:bg-gray-50" : "bg-[#34c759] hover:bg-[#2fb34e]"
                )}
              >
                <p className={clsx(
                  "font-extrabold leading-[normal] not-italic relative shrink-0 text-[12px] text-nowrap whitespace-pre",
                  isPlaying ? "text-[#475467]" : "text-white"
                )}>
                  {isPlaying ? 'Stop' : 'Play'}
                </p>
                <div className="h-[16px] relative shrink-0 w-[11.915px]">
                  <div className="absolute bottom-[7.25%] left-0 right-[9.07%] top-[7.63%]">
                    {isPlaying ? (
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                        <path d={stopSvgPaths.p16782840} fill="#B42318" />
                      </svg>
                    ) : (
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
                        <path d={svgPaths.p16da5700} fill="white" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
              <div className="bg-white relative rounded-[20px] shrink-0 size-[32px]">
                <button
                  onClick={cycleSpeed}
                  className="content-stretch flex items-center justify-center overflow-clip p-[12px] relative rounded-[inherit] size-full hover:bg-gray-50 transition-colors"
                >
                  <p className="font-medium leading-[normal] not-italic relative shrink-0 text-[#344054] text-[12px] text-nowrap whitespace-pre">
                    {playbackSpeed}X
                  </p>
                </button>
                <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0.714px] border-solid inset-0 pointer-events-none rounded-[20px]" />
              </div>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="h-[270px] relative shadow-[3px_0px_6px_0px_rgba(23,24,29,0.1)] shrink-0 w-full">
            {/* Static Base Page */}
            <div 
              className="absolute bg-white border-2 border-[#d4d8df] border-solid h-[270px] left-[calc(50%+0.5px)] rounded-br-[24px] rounded-tr-[24px] top-0 translate-x-[-50%] w-[422px]"
            >
              {/* Spiral binding lines */}
              <Frame10Helper additionalClassNames="left-[4px]">
                <path d="M0.5 0V269" stroke="#D3D7DE" />
              </Frame10Helper>
              <Frame10Helper additionalClassNames="left-[7px]">
                <path d="M0.5 0V269" stroke="#D4D9E0" />
              </Frame10Helper>

              {/* Ruled lines */}
              <div className="absolute h-[268px] right-[21px] top-0 w-[380px]">
                <div className="absolute bottom-0 left-[-0.07%] right-[-0.07%] top-0">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 381 268">
                    <g id="Frame 13">
                      <path d="M0.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M20.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M40.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M60.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M80.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M100.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M120.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M140.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M160.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M180.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M200.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M220.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M240.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M260.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M280.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M300.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M320.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M340.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M360.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                      <path d="M380.25 2V266" stroke="#E6E7EA" strokeWidth="0.5" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Drawing Canvas - Current Frame */}
              <div className="absolute inset-0 z-10">
                <DrawingCanvas
                  currentDrawings={currentFrameDrawings}
                  previousDrawings={previousFrameDrawings}
                  onAddDrawing={addDrawing}
                  tool={tool}
                  color={color}
                  pencilSize={pencilSize}
                  isPlaying={isPlaying}
                />
              </div>
            </div>

            {/* Spiral binding strip */}
            <div className="absolute flex h-[269px] items-center justify-center left-0 top-px w-[20px] z-30">
              <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                <div className="bg-[#d4d8df] h-[269px] w-[20px]" />
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <div className="content-stretch flex gap-[21px] items-center relative shrink-0">
              {/* Frame Navigation */}
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                    <Icons8Next onClick={goToPreviousFrame} disabled={currentFrame === 0 || isPlaying}>
                      <g>
                        <rect fill="#C8C9CA" height="39.2857" rx="19.6429" width="39.2857" x="0.357143" y="0.357143" />
                        <rect height="39.2857" rx="19.6429" stroke="white" strokeWidth="0.714286" width="39.2857" x="0.357143" y="0.357143" />
                        <path d={svgPaths.p232cbd80} fill="#1D2939" />
                      </g>
                    </Icons8Next>
                  </div>
                </div>
                <p className="font-medium leading-[normal] not-italic relative shrink-0 text-[#475467] text-[12px] text-nowrap whitespace-pre">
                  {currentFrame + 1} / {frames.length}
                </p>
                <Icons8Next additionalClassNames="shrink-0" onClick={goToNextFrame} disabled={isPlaying}>
                  <g>
                    <rect fill="#C8C9CA" height="39.2857" rx="19.6429" width="39.2857" x="0.357143" y="0.357143" />
                    <rect height="39.2857" rx="19.6429" stroke="white" strokeWidth="0.714286" width="39.2857" x="0.357143" y="0.357143" />
                    <path d={svgPaths.p232cbd80} fill="#1D2939" />
                  </g>
                </Icons8Next>
              </div>

              {/* Drawing Tools */}
              <div className="content-stretch flex gap-[4px] items-end relative shrink-0">
                {/* Pencil Tool */}
                <Icons8Next1
                  additionalClassNames={tool === 'pencil' ? "bg-[#c2c2c2]" : ""}
                  onClick={() => setTool('pencil')}
                >
                  <Wrapper1>
                    <g>
                      <path d={svgPaths.p3158a500} fill="#475467" />
                    </g>
                  </Wrapper1>
                </Icons8Next1>

                {/* Pencil Size Controls - Show only when pencil is selected with smooth transition */}
                <div className={clsx(
                  "flex gap-[4px] transition-all duration-300 ease-in-out overflow-hidden",
                  tool === 'pencil' ? "max-w-[70px] opacity-100" : "max-w-0 opacity-0"
                )}>
                  <button
                    onClick={decreasePencilSize}
                    disabled={pencilSize <= 1}
                    className="relative rounded-[20px] shrink-0 disabled:opacity-30 hover:bg-gray-100 transition-colors w-[31px] h-[31px] flex items-center justify-center"
                  >
                    <svg className="size-3" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6H10" stroke="#475467" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0.714px] border-solid inset-0 pointer-events-none rounded-[20px]" />
                  </button>
                  <button
                    onClick={increasePencilSize}
                    disabled={pencilSize >= 10}
                    className="relative rounded-[20px] shrink-0 disabled:opacity-30 hover:bg-gray-100 transition-colors w-[31px] h-[31px] flex items-center justify-center"
                  >
                    <svg className="size-3" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2V10M2 6H10" stroke="#475467" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0.714px] border-solid inset-0 pointer-events-none rounded-[20px]" />
                  </button>
                </div>

                {/* Color Picker */}
                <div className="relative">
                  <Icons8Next1
                    additionalClassNames={showColorPicker ? "bg-[#c2c2c2]" : ""}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  >
                    <Wrapper1>
                      <g clipPath="url(#clip0_4_96)">
                        <circle cx="7.5" cy="7.5" r="6" fill={color} />
                      </g>
                      <defs>
                        <clipPath id="clip0_4_96">
                          <rect fill="white" height="15" width="15" />
                        </clipPath>
                      </defs>
                    </Wrapper1>
                  </Icons8Next1>
                  {showColorPicker && (
                    <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-lg p-2 grid grid-cols-3 gap-2 z-20">
                      {colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => {
                            setColor(c);
                            setShowColorPicker(false);
                          }}
                          className="size-8 rounded-full border-2 border-gray-200 hover:scale-110 transition-transform"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Rectangle Tool */}
                <Icons8Next1
                  additionalClassNames={tool === 'rect' ? "bg-[#c2c2c2]" : ""}
                  onClick={() => setTool('rect')}
                >
                  <div className="h-[15px] relative shrink-0 w-[16px]">
                    <div className="absolute left-[4px] size-[8px] top-[3.5px]">
                      <div aria-hidden="true" className="absolute border-4 border-[#475467] border-solid inset-[-2px] pointer-events-none" />
                    </div>
                  </div>
                </Icons8Next1>

                {/* Circle Tool */}
                <Icons8Next1
                  additionalClassNames={tool === 'circle' ? "bg-[#c2c2c2]" : ""}
                  onClick={() => setTool('circle')}
                >
                  <Wrapper1>
                    <g>
                      <circle cx="7.5" cy="7.5" r="5" stroke="#475467" strokeWidth="2" fill="none" />
                    </g>
                  </Wrapper1>
                </Icons8Next1>

                {/* Line Tool */}
                <Icons8Next1
                  additionalClassNames={tool === 'line' ? "bg-[#c2c2c2]" : ""}
                  onClick={() => setTool('line')}
                >
                  <Wrapper>
                    <path d="M2 13L12.5 3.5" stroke="#475467" strokeWidth="4" />
                  </Wrapper>
                </Icons8Next1>

                {/* Star Tool */}
                <Icons8Next1
                  additionalClassNames={tool === 'star' ? "bg-[#c2c2c2]" : ""}
                  onClick={() => setTool('star')}
                >
                  <Wrapper>
                    <path d={svgPaths.p2c2eab00} stroke="#475467" strokeWidth="2.5" />
                  </Wrapper>
                </Icons8Next1>
              </div>
            </div>

            {/* Undo Button */}
            <div className="content-stretch flex items-end relative shrink-0">
              <Icons8Next1 onClick={undo} disabled={currentFrameDrawings.length === 0}>
                <Wrapper1>
                  <g>
                    <path d={svgPaths.p7dda072} fill="black" />
                  </g>
                </Wrapper1>
              </Icons8Next1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}