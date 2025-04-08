import { StackedAreaChart } from "./StackedAreaChart";

export const Graphs = ({
  title,
  data,
  dataKeys,
  labels,
  colors,
  visibilityState,
  setVisibilityState,
}) => {
  return (
    <div className="flex flex-col items-start p-6 gap-6 w-full h-[374px] bg-white shadow-lg rounded-2xl shadow-[4px_4px_8px_rgba(0,0,0,0.08)]">
      <div className="flex flex-row items-center p-0 gap-6 w-full h-[24px] self-stretch">
        <div className="text-[20px] font-roboto font-medium text-[#394555] flex-grow">
          {title}
        </div>
        <div className="flex flex-row gap-6">
          {dataKeys.map((key, i) => (
            <div
              key={key}
              className="flex flex-row items-center p-0 gap-2 rounded-[24px]"
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
      </div>

      <div className="w-full h-[278px]">
        <StackedAreaChart
          data={data}
          dataKeys={dataKeys}
          labels={labels}
          colors={colors}
          visibility={visibilityState}
        />
      </div>
    </div>
  );
};
