import React, { useRef } from "react";
import downwardArrow from "../../../assets/vector/downwardArrow.png";
const DownloadDropDownBox = () => {
  return (
    <div className="flex items-center py-3 px-4 gap-2 bg-white border border-[#DEE0E3] rounded-[12px] flex-none order-1 flex-grow-0 cursor-pointer">
      <div className="font-roboto font-normal text-[18px] leading-[16px] text-[#5A6472] flex-none order-0 flex-grow-0 text-nowrap">
        Download Sample data
      </div>
      <div className="flex-none order-1 flex-grow-0">
        <img src={downwardArrow} alt="Icon" className="w-[16px] h-[16px]" />
      </div>
    </div>
  );
};

export default DownloadDropDownBox;
