import React from "react";
import downwardArrow from "../../../assets/vector/downwardArrow.png";
import upwardArrow from "../../../assets/vector/upwardArrow.png";

const DropDownBox = ({
  handleSelectCategoryToggle,
  selectCategoryDropDownOpen,
  selectedCategory,
}) => {
  return (
<div
  className="flex items-center py-3 px-6 sm:px-4 sm:py-3 gap-2 bg-white border border-[#DEE0E3] rounded-[12px] flex-none order-1 flex-grow-0 cursor-pointer"
  onClick={handleSelectCategoryToggle}
>
      <div className="font-roboto font-normal text-[18px] leading-[16px] text-[#5A6472] flex-none order-0 flex-grow-0 text-nowrap">
        {selectedCategory === null ? "Select Category" : selectedCategory.name}
      </div>
      <div className="flex-none order-1 flex-grow-0">
        <img
          src={selectCategoryDropDownOpen ? upwardArrow : downwardArrow}
          alt="Icon"
          className="w-[16px] h-[16px]"
        />
      </div>
    </div>
  );
};

export default DropDownBox;
