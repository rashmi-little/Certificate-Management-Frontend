import React from "react";

const RequestFooter = () => {
  return (
    <div className="flex flex-col items-start p-4 gap-4 w-[1136px] h-[80px] bg-white shadow-[6px_6px_12px_rgba(0,_0,_0,_0.06)] rounded-lg flex-none order-2 self-stretch flex-grow-0">
      <div className="flex flex-row justify-end items-center p-0 gap-4 w-[1104px] h-[48px] flex-none order-0 flex-grow-0">
        <div className="flex flex-row justify-center items-center p-[12px_32px] gap-2 w-[172px] h-[48px] bg-[#BDC1C7] rounded-[12px] flex-none order-1 flex-grow-0 cursor-pointer">
          <p className="font-roboto font-medium text-[16px] leading-[100%] tracking-[0%] text-center text-[#757D8A]">
            Add Recipients
          </p>
        </div>
        <div className="flex flex-row justify-center items-center p-[12px_28px] gap-2 w-[134px] h-[48px] border border-[#0066FF] rounded-[12px] flex-none order-0 flex-grow-0 cursor-pointer">
          <p className="font-roboto font-medium text-[16px] leading-[100%] tracking-[0%] text-center text-[#0066FF]">
            Do it later
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestFooter;
