import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Tooltip as MuiTooltip } from "@mui/material";

const CustomDotWithTooltip = ({ cx, cy, value, color, name }) => {
  const [open, setOpen] = useState(false);

  return (
    <MuiTooltip
      open={open}
      title={
        <span style={{ color: "white", fontWeight: 600 }}>
          {Math.round(Number(String(value).replace(",", ".")) * 10)}
        </span>
      }
      placement="top"
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      arrow
      PopperProps={{
        modifiers: [
          {
            name: "offset",
            options: { offset: [0, 0] },
          },
        ],
      }}
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: color,
            width: 53,
            height: 27.98,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 0,
            m: 0,
          },
        },
        arrow: {
          sx: { color },
        },
      }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill={color}
        stroke="#fff"
        strokeWidth={1.5}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{ cursor: "pointer" }}
      />
    </MuiTooltip>
  );
};

// 🧠 Reusable Chart Component
export const StackedAreaChart = ({
  data = [],
  dataKeys = [],
  labels = [],
  colors = [],
  visibility = {},
}) => {
  const xTicks = data?.map((d) => d.day);
  const yValues = data?.flatMap((item) =>
    dataKeys.map((key) => item[key] || 0)
  );
  const uniqueYTicks = [...new Set(yValues)].sort((a, b) => a - b);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          {dataKeys.map((key, i) => (
            <linearGradient
              key={key}
              id={`${key}Color`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={colors[i]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colors[i]} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>

        <XAxis
          dataKey="day"
          tick={{ fill: "rgba(117, 125, 138, 1)" }}
          ticks={xTicks}
        />
        <YAxis tick={{ fill: "rgba(117, 125, 138, 1)" }} ticks={uniqueYTicks} />
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

        {dataKeys.map((key, i) =>
          visibility[key] ? (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[i]}
              fill={`url(#${key}Color)`}
              dot={(props) => (
                <CustomDotWithTooltip
                  {...props}
                  color={colors[i]}
                  name={labels[i]}
                />
              )}
              activeDot={{ r: 6 }}
              name={labels[i]}
              isAnimationActive={true}
            />
          ) : null
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
};
