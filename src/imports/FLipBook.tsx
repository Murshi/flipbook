import svgPaths from "./svg-3r6rzsvdu5";
import clsx from "clsx";
import imgImage1 from "figma:asset/e330964143f7c51013a1771d69e7da50e26c422e.png";
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("size-[37px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37 37">
        {children}
      </svg>
    </div>
  );
}

export default function FLipBook() {
  return (
    <div className="bg-[#8e8e93] relative size-full" data-name="FLip book">
      <div className="absolute bg-white h-[270px] left-[calc(50%-2.5px)] rounded-[20px] top-[20px] translate-x-[-50%] w-[422px]" />
      <div className="absolute flex items-center justify-center left-[21px] size-[37px] top-[302px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Wrapper additionalClassNames="relative">
            <g id="Group 2">
              <circle cx="18.5" cy="18.5" fill="var(--fill-0, white)" id="Ellipse 2" r="18.5" />
              <path d={svgPaths.p30cfd00} fill="var(--fill-0, #6155F5)" id="Vector 2" />
            </g>
          </Wrapper>
        </div>
      </div>
      <Wrapper additionalClassNames="absolute left-[70px] top-[302px]">
        <g id="Group 1">
          <circle cx="18.5" cy="18.5" fill="var(--fill-0, white)" id="Ellipse 3" r="18.5" />
          <path d={svgPaths.p30cfd00} fill="var(--fill-0, #6155F5)" id="Vector 3" />
          <rect fill="var(--fill-0, #6155F5)" height="14" id="Rectangle 3" width="4" x="25" y="12" />
        </g>
      </Wrapper>
      <div className="absolute bg-[#6155f5] h-[14px] left-[30px] top-[314px] w-[4px]" />
      <div className="absolute bg-[#34c759] content-stretch flex gap-[6px] items-center left-[314px] px-[12px] py-[8px] rounded-[24px] top-[301px]">
        <p className="font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[normal] not-italic relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">Play</p>
        <div className="h-[23.5px] relative shrink-0 w-[17.5px]">
          <div className="absolute bottom-[7.25%] left-0 right-[9.07%] top-[7.63%]" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
              <path d={svgPaths.p2d629e80} fill="var(--fill-0, white)" id="Vector 1" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-center justify-center left-[399px] p-[8px] rounded-[20px] size-[40px] top-[301px]">
        <div aria-hidden="true" className="absolute border border-[#62626c] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <p className="font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[normal] not-italic relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">1X</p>
      </div>
      <div className="absolute left-[124px] size-[40px] top-[301px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <g id="Frame 3">
            <rect height="39" rx="19.5" stroke="var(--stroke-0, #62626C)" width="39" x="0.5" y="0.5" />
            <rect height="13.4167" id="Rectangle 4" stroke="var(--stroke-0, white)" strokeWidth="0.583333" width="13.4167" x="13.2917" y="13.2917" />
            <circle cx="22" cy="23" id="Ellipse 4" r="7.20833" stroke="var(--stroke-0, white)" strokeWidth="0.583333" />
          </g>
        </svg>
      </div>
      <div className="absolute content-stretch flex flex-col items-center justify-center left-[166px] p-[8px] rounded-[20px] size-[40px] top-[301px]">
        <div aria-hidden="true" className="absolute border border-[#62626c] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <div className="relative shrink-0 size-[21px]" data-name="image 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
        </div>
      </div>
    </div>
  );
}