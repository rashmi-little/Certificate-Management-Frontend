import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PROCESS_SUBMIT_CLICK } from "../../../redux/certificate/ActionType";
import { store } from "../../../redux/store";

const RequestContainerFooter = ({ handleDoItLaterClick }) => {
  const dispatch = useDispatch();
  const stepperValue = useSelector((store) => store.certificate?.stepperValue);
  const isSubmitActive = useSelector(
    (store) => store.certificate?.footerSubmitStatus
  );

  function handleSubmitClick() {
    if (isSubmitActive && stepperValue < 3) {
      dispatch({
        type: PROCESS_SUBMIT_CLICK,
        payload: stepperValue,
      });
    }
  }
  return (
    <footer className="px-4 gap-4 bg-white shadow-[6px_6px_12px_rgba(0,_0,_0,_0.06)] rounded-lg">
      <div className="flex flex-row justify-end items-center p-0 gap-4 flex-grow h-[100%]">
        <button
          className={`flex flex-row justify-center items-center gap-2 w-[172px] h-[48px] rounded-[12px] flex-none order-1 flex-grow-0 cursor-pointer font-roboto font-medium text-[16px] leading-[100%] tracking-[0%] text-center
    ${isSubmitActive ? "bg-[#0066FF] text-[#FFFFFF]" : "bg-[#BDC1C7] text-[#757D8A]"}`}
          onClick={handleSubmitClick}
        >
          Add Recipients
        </button>
        <button
          className="flex flex-row justify-center items-center p-[12px_28px] gap-2 w-[134px] h-[48px] border border-[#0066FF] rounded-[12px] flex-none order-0 flex-grow-0 cursor-pointer font-roboto font-medium text-[16px] leading-[100%] tracking-[0%] text-center text-[#0066FF]"
          onClick={handleDoItLaterClick}
        >
          Do it later
        </button>
      </div>
    </footer>
  );
};

export default RequestContainerFooter;
