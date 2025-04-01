import React from "react";
import RequestContainerBody from "./RequestContainerBody";
import RequestFooter from './RequestFooter';

const RequestContainer = () => {
  return (
    <div className="flex flex-col items-start gap-6 w-[1184px] h-[880px]">
      <div className="flex flex-col items-start p-4 gap-4 w-[1136px] h-[158px] bg-white shadow-lg rounded-lg">
        <h1 className="text-xl font-semibold">Generate New Request</h1>
        <div className="flex flex-col items-start p-0 gap-3 w-[1104px] h-[74px] rounded-lg filter drop-shadow-lg">
          <div className="flex flex-col items-start px-20 pb-8 gap-2 w-[1104px] h-[74px]">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-center p-0 gap-2">
                  <div className="w-[42px] h-[42px] flex items-center justify-center rounded-full bg-[#FAFAFA] border-2 border-blue-500 text-blue-500 text-[20px] leading-[26px] font-normal shadow-inner">
                    <span
                      className="color-primary-300 font-roboto text-base leading-6 tracking-normal"
                    >
                      1
                    </span>
                  </div>
                  <div className="after:content-[attr(after)] absolute after:flex bottom-0 after:font-roboto after:font-medium after:text-center after:text-[16px] after:leading-[24px] after:tracking-0 after:text-neutral-800" after="Select Template" ></div>
                </div>

                <div className="h-[2px] flex-1 bg-neutral-300"></div>

                <div className="flex flex-col items-center p-0 gap-2">
                  <div className="w-[42px] h-[42px] flex items-center justify-center rounded-full bg-[#FAFAFA] border-2 border-[#DEE0E3] text-[#394555] text-[20px] leading-[26px] font-normal shadow-inner">
                    2
                  </div>
                  <div className="after:content-[attr(after)] absolute after:flex bottom-0 after:font-roboto after:font-medium after:text-center after:text-[16px] after:leading-[24px] after:tracking-0 after:text-neutral-800" after="Add Recipients" ></div>
                </div>
                <div className="h-[2px] flex-1 bg-neutral-300"></div>

                <div className="flex flex-col items-center p-0 gap-2">
                  <div className="w-[42px] h-[42px] flex items-center justify-center rounded-full bg-[#FAFAFA] border-2 border-[#DEE0E3] text-[#394555] text-[20px] leading-[26px] font-normal shadow-inner">
                    3
                  </div>
                  <div className="after:content-[attr(after)] absolute after:flex bottom-0 after:font-roboto after:font-medium after:text-center after:text-[16px] after:leading-[24px] after:tracking-0 after:text-neutral-800" after="Schedule" ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RequestContainerBody />
      <RequestFooter />
    </div>
  );
};

export default RequestContainer;
