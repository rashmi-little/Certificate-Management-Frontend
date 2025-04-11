import React from "react";
import { render, screen } from "@testing-library/react";
import { it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import DashboardBody from "../../components/DashboardBody";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router-dom";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

// Mock child components
vi.mock("../../components/DashboardHead/DashboardHead", () => ({
  default: vi.fn(() => <div>DashboardHead</div>),
}));

vi.mock("../../components/StatisticsFrameComponent/FrameComponent", () => ({
  default: vi.fn(() => <div>FrameComponent</div>),
}));

vi.mock("../../components/RequestTable/RequestTable", () => ({
  default: vi.fn(() => <div>RequestTable</div>),
}));

vi.mock("../../components/Graphs/Graphs", () => ({
  default: vi.fn(({ title }) => <div>{title} Graph</div>),
}));

vi.mock(
  "../../components/MobileView/DashboardHead/MobileDashboardHead",
  () => ({
    default: vi.fn(() => <div>MobileDashboardHead</div>),
  })
);

vi.mock("../../components/MobileView/DashboardFrame/DashboardFrame", () => ({
  default: vi.fn(() => <div>DashboardFrame</div>),
}));

vi.mock(
  "../../components/MobileView/MobileRequestTable/MobileRequestTable",
  () => ({
    default: vi.fn(() => <div>MobileRequestTable</div>),
  })
);

vi.mock("../../components/MobileView/MobileGraph/MobileGraphs", () => ({
  default: vi.fn(({ title }) => <div>{title} Mobile Graph</div>),
}));

it("renders all components", () => {
  global.innerWidth = 1024; // simulate desktop

  render(
    <Provider store={store}>
      <BrowserRouter>
        <DashboardBody />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.queryAllByText("Dashboard").length).toBeGreaterThan(0);
  expect(screen.queryAllByText("Total Requests").length).toBeGreaterThan(0);
  expect(
    screen.queryAllByText("Requests & Certificates").length
  ).toBeGreaterThan(0);
  expect(
    screen.queryAllByText("Scheduled vs Failed vs Delivered").length
  ).toBeGreaterThan(0);
  expect(
    screen.queryAllByText("Certificates Issued vs Tickets Received").length
  ).toBeGreaterThan(0);
});
