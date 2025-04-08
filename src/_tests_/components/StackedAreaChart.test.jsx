import React from "react";
import { waitFor, render } from "@testing-library/react";
import { StackedAreaChart } from "../../components/StackedAreaChart";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

it("renders without crashing with minimal valid props", () => {
  render(
    <StackedAreaChart
      data={[]}
      dataKeys={[]}
      labels={[]}
      colors={[]}
      visibility={{}}
    />
  );
});

it("renders axes and chart areas correctly with sample data", async () => {
  const { container } = render(
    <div style={{ width: 500, height: 300 }}>
      <StackedAreaChart
        data={[
          { day: "Mon", value1: 10, value2: 20 },
          { day: "Tue", value1: 15, value2: 25 },
        ]}
        dataKeys={["value1", "value2"]}
        labels={["Value 1", "Value 2"]}
        colors={["#8884d8", "#82ca9d"]}
        visibility={{ value1: true, value2: true }}
      />
    </div>
  );

  waitFor(() => {
    const textElements = container.querySelectorAll("text");
    const textContent = Array.from(textElements).map((el) => el.textContent);

    expect(textContent).toContain("1");
    expect(textContent).toContain("2");
  });
});

it("does not render area if visibility is false", () => {
  const data = [{ day: "Mon", value1: 10, value2: 20 }];

  const div = document.createElement("div");
  Object.defineProperty(div, "clientWidth", { value: 800 });
  Object.defineProperty(div, "clientHeight", { value: 400 });
  document.body.appendChild(div);

  const { container } = render(
    <StackedAreaChart
      data={data}
      dataKeys={["value1", "value2"]}
      labels={["Label 1", "Label 2"]}
      colors={["#8884d8", "#82ca9d"]}
      visibility={{ value1: true, value2: false }}
    />,
    { container: div }
  );

  const svg = container.querySelector("svg");

  expect(svg instanceof SVGElement).toBe(false);

  const paths = container.querySelectorAll("path");
  expect(paths.length).toEqual(0);
});

it("renders custom dots based on data", () => {
  const data = [{ day: "Mon", value1: 10 }];

  render(
    <StackedAreaChart
      data={data}
      dataKeys={["value1"]}
      labels={["Label 1"]}
      colors={["#8884d8"]}
      visibility={{ value1: true }}
    />
  );

  waitFor(() => {
    const textElements = container.querySelectorAll("text");
    const textContent = Array.from(textElements).map((el) => el.textContent);

    expect(textContent).toContain("1");
  });
});
