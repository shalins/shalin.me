import React from "react";

export default function Name() {
  return (
    <div className="pb-8">
      <div className="border-t-2 border-l-2 border-red-500 flex justify-between items-start p-0 overflow-hidden lg:-mx-6 xl:-mx-16 2xl:-mx-32">
        <div className="ml-0 mt-0 xl:-ml-[10px] xl:-mt-[10px]">
          <h1 className="font-ft88-serif text-3xl sm:text-4xl md:text-5xl lg:text-[5.5rem] text-black font-medium tracking-tighter leading-none">
            Shalin Shah
          </h1>
        </div>
        <div className="ml-0 mt-0 pb-1 border-r-2 border-red-500 xl:-ml-[1px] xl:-mt-[6px]">
          <div className="font-ft88-serif text-base sm:text-lg text-black self-start tracking-[-0.12em]">
            929745000
          </div>
        </div>
      </div>
    </div>
  );
}
