import React from "react";
import { useSelector } from "react-redux";

const CustomStepper = () => {
  const stepperCurrentStep = useSelector(
    (store) => store.certificate?.stepperValue
  );
  return (
    <div className="flex flex-col items-start p-0 gap-3 w-[100%] rounded-lg filter drop-shadow-lg">
      <div className="flex flex-col items-start px-15 sm:px-10 md:px-20 pb-8 gap-2 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-center p-0 gap-2">
            <div
              className={`w-[42px] h-[42px] flex items-center justify-center rounded-full text-[20px] leading-[26px] font-normal 
                shadow-inner border-2 border-blue-500 ${stepperCurrentStep === 0 ? "bg-[#FAFAFA] text-blue-500 " : " bg-[#408DFF]"}`}
            >
              <span
                className={`color-primary-300 font-roboto text-base leading-6 tracking-normal ${stepperCurrentStep === 0 ? "" : "text-[#FAFAFA]"}`}
              >
                {stepperCurrentStep === 0 ? "1" : "✔"}
              </span>
            </div>
            <div
              className="after:content-[attr(after)] absolute after:flex bottom-0 after:font-roboto after:font-medium after:text-center after:text-[16px] after:leading-[24px] after:tracking-0 after:text-neutral-800"
              after="Select Template"
            ></div>
          </div>

          <div
            className={`h-[2px] flex-1 ${stepperCurrentStep === 0 ? "bg-neutral-300 " : "bg-[#408DFF]"}`}
          ></div>

          <div className="flex flex-col items-center p-0 gap-2">
            <div
              className={`w-[42px] h-[42px] flex items-center justify-center rounded-full border-2 border-[#DEE0E3] text-[#394555] text-[20px] leading-[26px] font-normal shadow-inner 
    ${stepperCurrentStep === 1 ? "bg-[#FAFAFA] text-blue-500 border-blue-500" : ""} 
    ${stepperCurrentStep >= 2 ? "bg-[#408DFF] text-white border-blue-500" : ""}`}
            >
              <span
                className={`color-primary-300 font-roboto text-base leading-6 tracking-normal ${stepperCurrentStep < 2 ? "" : "text-[#FAFAFA]"}`}
              >
                {stepperCurrentStep < 2 ? "2" : "✔"}
              </span>
            </div>
            <div
              className="after:content-[attr(after)] absolute after:flex bottom-0 after:font-roboto after:font-medium after:text-center after:text-[16px] after:leading-[24px] after:tracking-0 after:text-neutral-800"
              after="Add Recipients"
            ></div>
          </div>

          <div
            className={`h-[2px] flex-1 ${stepperCurrentStep < 2 ? "bg-neutral-300 " : "bg-[#408DFF]"} `}
          ></div>

          <div className="flex flex-col items-center p-0 gap-2">
            <div
              className={`w-[42px] h-[42px] flex items-center justify-center rounded-full border-2 border-[#DEE0E3] text-[#394555] text-[20px] leading-[26px] font-normal shadow-inner 
    ${stepperCurrentStep === 2 ? "bg-[#FAFAFA] text-blue-500 border-blue-500" : ""} 
    ${stepperCurrentStep >= 3 ? "bg-[#408DFF] text-white border-blue-500" : ""}`}
            >
              <span
                className={`color-primary-300 font-roboto text-base leading-6 tracking-normal ${stepperCurrentStep < 3 ? "" : "text-[#FAFAFA]"}`}
              >
                {stepperCurrentStep < 3 ? "3" : "✔"}
              </span>
            </div>
            <div
              className="after:content-[attr(after)] absolute after:flex bottom-0 after:font-roboto after:font-medium after:text-center after:text-[16px] after:leading-[24px] after:tracking-0 after:text-neutral-800"
              after="Schedule"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomStepper;
