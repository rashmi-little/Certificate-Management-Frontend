import React, { useState } from "react";
import downwardArrow from "../../../assets/vector/downwardArrow.png";
import upwardArrow from "../../../assets/vector/upwardArrow.png";

const RequestContainerBody = () => {
  const [selectCategoryDropDownOpen, setSelectCategoryDropDownOpen] =
    useState(false);

  const [selectCategory, setSelectCategory] = useState("Select Category");

  const categories = [
    "Achievement",
    "Training complete",
    "Outstanding Performance",
    "Employee of the Month",
    "CTC Letter",
    "Employment Letter",
    "Monthly Recognition",
    "Rising Star",
    "Attendance Star",
    "random category",
  ];

  function handleSelectCategoryToggle() {
    setSelectCategoryDropDownOpen((prevState) => !prevState);
  }

  function handleSelectCategoryChange(selectedCategory) {
    setSelectCategory(() => selectedCategory);
    handleSelectCategoryToggle();
  }

  return (
    <div className="flex flex-col items-start p-4 gap-4 isolation-auto w-[1136px] h-[546px] bg-white shadow-[6px_6px_12px_rgba(0,_0,_0,_0.06)] rounded-lg">
      <div className="flex flex-row items-start p-0 gap-2.5 w-[1104px] h-[40px] flex-none order-0 self-stretch flex-grow-0 justify-between relative">
        <p className="font-roboto font-normal text-[16px] leading-[100%] tracking-normal">
          Select Certificate Template
        </p>

        <div
          className="flex items-center p-2 px-4 gap-2 w-[180px] h-[40px] bg-white border border-[#DEE0E3] rounded-[12px] flex-none order-1 flex-grow-0 cursor-pointer"
          onClick={handleSelectCategoryToggle}
        >
          <div className="w-[131px] h-[16px] font-roboto font-normal text-[14px] leading-[16px] text-[#5A6472] flex-none order-0 flex-grow-0 text-nowrap overflow-hidden">
            {selectCategory}
          </div>
          <div className="flex-none order-1 flex-grow-0">
            <img
              src={selectCategoryDropDownOpen ? downwardArrow : upwardArrow}
              alt="Icon"
              className="w-[16px] h-[16px]"
            />
          </div>
        </div>
        {/* absolute float dropdown menu */}
        {selectCategoryDropDownOpen && (
          <div className="flex flex-col items-center absolute w-[180px] h-[296px] right-0 top-[110%] bg-white border border-[#DEE0E3] shadow-[4px_4px_12px_rgba(0,_0,_0,_0.08)] rounded-[12px] flex-none order-1 py-1 overflow-x-hidden hide-scrollbar overflow-y-scroll">
            {categories.map((category, index) => (
              <div className="py-2 px-2.5 w-[100%] cursor-pointer" onClick={() => handleSelectCategoryChange(category)} key={index}>
                <p className="font-roboto text-[#757D8A] text-[14px]">
                  {category}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* complete the first div of select category */}
      <div className="flex flex-col justify-center items-center p-0 gap-4 w-[1104px] h-[466px] flex-none order-1 self-stretch flex-grow">
        <p className="font-roboto text-[#394555] text-[14px]">
          Please select a category to view the templates.
        </p>
      </div>
    </div>
  );
};

export default RequestContainerBody;
