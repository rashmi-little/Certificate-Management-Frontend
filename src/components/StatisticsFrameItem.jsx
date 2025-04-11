import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ExternalLink from "../assets/Dashboard/ExternalLink.svg";
import { useNavigate } from "react-router-dom";

export const FrameItem = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => setShowDetails(true);
  const handleMouseLeave = () => setShowDetails(false);

  const handleNavigation = () => {
    switch (item.title) {
      case "Total Requests":
        navigate("/logs");
        break;
      case "Scheduled Requests":
        navigate("/logs?status=SCHEDULE");
        break;
      case "Failed Requests":
        navigate("/logs?status=FAILED");
        break;
      case "Certificates Issued":
        navigate("/certificates");
        break;
      case "Users Added":
        navigate("/users");
        break;
      case "Tickets Received":
        navigate("/tickets");
        break;
      default:
        break;
    }
  };

  // Determine growth color
  let growthColor = "#0FE665"; // Default green

  if (
    [
      "Total Requests",
      "Scheduled Requests",
      "Certificates Issued",
      "Users Added",
    ].includes(item.title)
  ) {
    // Green if positive or zero, red if negative
    growthColor = item.growth >= 0 ? "#0FE665" : "#F22C2C";
  } else if (["Tickets Received", "Failed Requests"].includes(item.title)) {
    // Green if negative or zero, red if positive
    growthColor = item.growth > 0 ? "#F22C2C" : "#0FE665";
  }

  return (
    <div className="w-[362.67px] h-[104px] flex flex-auto flex-row  p-6 gap-4 bg-white shadow-md rounded-xl justify-between">
      <div className=" w-full h-[56px] flex flex-col items-start gap-1">
        <div className="w-full h-[28px] flex flex-row items-center gap-2">
          <div className=" h-[24px] text-[#757D8A] font-roboto text-base leading-[150%]">
            {item.title}
          </div>
          <div
            className="w-[16px] h-[16px] inset-0 bg-[#5A6472] rounded-[28.4444px] flex flex-col items-center justify-center cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <svg
              width="3"
              height="3"
              viewBox="0 0 3 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.66797 2.33398C2.22025 2.33398 2.66797 1.88627 2.66797 1.33398C2.66797 0.7817 2.22025 0.333984 1.66797 0.333984C1.11568 0.333984 0.667969 0.7817 0.667969 1.33398C0.667969 1.88627 1.11568 2.33398 1.66797 2.33398Z"
                fill="white"
              />
            </svg>
            <svg
              width="4"
              height="7"
              viewBox="0 0 4 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.33203 1.33398C1.50884 1.33398 1.67841 1.40422 1.80344 1.52925C1.92846 1.65427 1.9987 1.82384 1.9987 2.00065V5.33398C1.9987 5.5108 2.06894 5.68036 2.19396 5.80539C2.31898 5.93041 2.48855 6.00065 2.66536 6.00065"
                stroke="white"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {showDetails && (
          <div className="w-[152px] h-[62px] left-[400px] top-[252px] drop-shadow-md ml-25 ">
            <div className="absolute w-[156px] h-[56px] bg-white border border-[#DEE0E3] shadow-md rounded-[12px] flex flex-col items-start p-[4px_0px] box-border">
              <div className="flex flex-row items-center p-[8px_12px] gap-[4px]  h-[48px]">
                <span className=" h-[32px] font-roboto font-normal text-[14px] leading-[16px] text-[#757D8A]">
                  {item.title} during this period
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="w-full h-[28px] flex flex-row items-baseline gap-2">
          <div className="w-[61px] h-[28px] text-[#001A40] font-roboto font-semibold text-[24px] leading-[28px]">
            {item.value}
          </div>
          <div
            className="w-[39px] h-[19px] font-roboto font-semibold text-[16px] leading-[19px]"
            style={{ color: growthColor }}
          >
            {item.growth}%
          </div>
        </div>
      </div>
      <div
        className="w-[32px]  flex flex-auto items-center justify-center text-2xl cursor-pointer"
        onClick={handleNavigation}
      >
        <img src={ExternalLink} alt="External Link" />
      </div>
    </div>
  );
};
