import { StackedAreaChart } from "../StackedAreaChart";
import { useState } from "react";

export const MobileGraphs = ({
  title,
  data,
  dataKeys,
  labels,
  colors,
  visibilityState,
  setVisibilityState,
}) => {
  const [dropDown, setDropdown] = useState(false);
  const alterDropDown = () => setDropdown(!dropDown);
  return (
    <div className="flex flex-col items-start  gap-2 w-full h-auto overflow-x-scroll">
      <div className="flex flex-col items-start p-[18.7183px] gap-[18.72px] w-full h-auto bg-white shadow-[3.11972px_3.11972px_6.23944px_rgba(0,0,0,0.08)] rounded-[12.4789px] flex-none order-0 self-stretch flex-grow-0">
        <div class="flex flex-row items-center p-0 gap-[18.72px] w-full h-[24px] flex-none order-0 self-stretch flex-grow-0">
          <div className="w-auto h-[16px] text-[15.5986px] leading-[16px] font-roboto font-medium text-[#394555] flex-none order-0 flex-grow">
            {title}
          </div>
          <div className="flex flex-row justify-center items-center p-0 gap-2 w-[24px] h-[24px] flex-none order-6 flex-grow-0 relative curser-pointer">
            <span className="flex flex-row justify-center items-center p-1 gap-2 w-6 h-6 bg-gray-100 rounded-full cursor-pointer ">
              <svg
                width="4"
                height="16"
                viewBox="0 0 4 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={alterDropDown}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 3.5C2.82843 3.5 3.5 2.82843 3.5 2C3.5 1.17157 2.82843 0.5 2 0.5C1.17157 0.5 0.5 1.17157 0.5 2C0.5 2.82843 1.17157 3.5 2 3.5ZM2 9.5C2.82843 9.5 3.5 8.82843 3.5 8C3.5 7.17157 2.82843 6.5 2 6.5C1.17157 6.5 0.5 7.17157 0.5 8C0.5 8.82843 1.17157 9.5 2 9.5ZM3.5 14C3.5 14.8284 2.82843 15.5 2 15.5C1.17157 15.5 0.5 14.8284 0.5 14C0.5 13.1716 1.17157 12.5 2 12.5C2.82843 12.5 3.5 13.1716 3.5 14Z"
                  fill="#5A6472"
                />
              </svg>
            </span>
          </div>
        </div>
        {dropDown && (
          <div className="flex flex-row gap-6 w-full justify-center">
            {dataKeys.map((key, i) => (
              <div
                key={key}
                className="flex flex-row items-center p-0 gap-2 rounded-[24px] "
              >
                <div
                  className="w-[24px] h-[24px]"
                  style={{ backgroundColor: colors[i], borderRadius: "100%" }}
                ></div>
                <div className="text-[#394555] font-roboto font-semibold text-[20px]">
                  {labels[i]}
                </div>
                <input
                  type="checkbox"
                  className="w-[24px] h-[24px] bg-[#394555] rounded-[6px] accent-[#394555] cursor-pointer"
                  checked={visibilityState[key]}
                  onChange={() =>
                    setVisibilityState((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }))
                  }
                />
              </div>
            ))}
          </div>
        )}

        <div className="w-full h-[217.8px]">
          <StackedAreaChart
            data={data}
            dataKeys={dataKeys}
            labels={labels}
            colors={colors}
            visibility={visibilityState}
          />
        </div>
      </div>
    </div>
  );
};
