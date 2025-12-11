import svgPaths from "./svg-wpf9vxyrc3";

export default function Frame() {
  return (
    <div className="bg-white relative rounded-[24px] size-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[6px] items-center px-[12px] py-[8px] relative size-full">
          <p className="font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#475467] text-[12px] text-nowrap whitespace-pre">Stop</p>
          <div className="h-[12px] relative shrink-0 w-[11.915px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <path d={svgPaths.p16782840} fill="var(--fill-0, #B42318)" id="Vector 1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}