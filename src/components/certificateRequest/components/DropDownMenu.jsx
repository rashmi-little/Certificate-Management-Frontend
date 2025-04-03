import React from "react";

const DropDownMenu = ({ categories, handleSelectCategoryChange }) => {
  return (
    <div className="flex flex-col items-center absolute w-[180px] max-h-[296px] min-h-[0] right-0 top-[110%] bg-white border border-[#DEE0E3] shadow-[4px_4px_12px_rgba(0,_0,_0,_0.08)] rounded-[12px] flex-none order-1 py-1 overflow-x-hidden hide-scrollbar overflow-y-auto z-10">
      {categories.map((category) => (
        <div
          className="py-2 px-3 w-[100%] cursor-pointer"
          onClick={() => handleSelectCategoryChange(category)}
          key={category.certificateCategoryId}
        >
          <p className="font-roboto text-[#757D8A] text-[14px]">
            {category.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DropDownMenu;
