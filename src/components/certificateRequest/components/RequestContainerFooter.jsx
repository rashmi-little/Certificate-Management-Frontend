import React, { useState } from "react";

const RequestContainerFooter = ({
  setSelectCategory,
  setSelectCategoryDropDownOpen,
  resetTemplates,
}) => {
  function handleDoItLaterClick() {
    setSelectCategory(() => "Select Category");
    setSelectCategoryDropDownOpen(() => false);
    resetTemplates();
  }

  const [recipientAddStatus, setRecipientAddStatus] = useState(false);
  return (
    <footer className="px-4 gap-4 bg-white shadow-[6px_6px_12px_rgba(0,_0,_0,_0.06)] rounded-lg">
      <div className="flex flex-row justify-end items-center p-0 gap-4 flex-grow h-[100%]">
        <div
          className={`flex flex-row justify-center items-center gap-2 w-[172px] h-[48px] rounded-[12px] flex-none order-1 flex-grow-0 cursor-pointer 
    ${recipientAddStatus ? "bg-[#0066FF] text-[#FFFFFF]" : "bg-[#BDC1C7] text-[#757D8A]"}`}
        >
          <p className="font-roboto font-medium text-[16px] leading-[100%] tracking-[0%] text-center">
            Add Recipients
          </p>
        </div>
        <div
          className="flex flex-row justify-center items-center p-[12px_28px] gap-2 w-[134px] h-[48px] border border-[#0066FF] rounded-[12px] flex-none order-0 flex-grow-0 cursor-pointer"
          onClick={handleDoItLaterClick}
        >
          <p className="font-roboto font-medium text-[16px] leading-[100%] tracking-[0%] text-center text-[#0066FF]">
            Do it later
          </p>
        </div>
      </div>
    </footer>
  );
};

export default RequestContainerFooter;
