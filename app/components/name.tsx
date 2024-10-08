import React from "react";

export default function Name() {
  return (
    <div className="pb-8">
      <div className="border-t-2 border-l-2 border-red-500 flex justify-between items-start p-0 overflow-hidden -mx-48 lg:-mx-16">
        <div className="-ml-[10px] -mt-[10px]">
          <h1 className="font-ft88-serif text-7xl text-black font-medium tracking-tighter">
            Shalin Shah
          </h1>
        </div>
        <div className="-ml-[1px] -mt-[6px] pb-1 border-r-2 border-red-500">
          <div className="font-ft88-serif text-lg text-black self-start tracking-[-0.12em]">
            1999-06-19
          </div>
        </div>
      </div>
    </div>
  );
}
