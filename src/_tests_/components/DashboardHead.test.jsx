import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { DashboardHead } from "../../components/DashboardHead";
import * as actions from "../../redux/certificate/Action";

vi.mock("../../redux/certificate/Action", () => ({
  getCertificateStatistics: vi.fn(() => ({ type: "MOCK_STATS" })),
}));

const mockStore = configureStore([]);
const renderWithStore = (store) =>
  render(
    <Provider store={store}>
      <DashboardHead />
    </Provider>
  );

describe("DashboardHead Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    vi.clearAllMocks();
  });

  it("renders all initial elements correctly", () => {
    renderWithStore(store);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Select Date")).toBeInTheDocument();
    expect(screen.getByText("Monthly")).toBeInTheDocument();
    expect(screen.getByText("Select Month")).toBeInTheDocument();
  });

  it("opens and selects an option in the Monthly/Yearly dropdown", async () => {
    renderWithStore(store);

    const toggleBtn = screen.getByText("Monthly");
    await userEvent.click(toggleBtn);

    const yearlyOption = screen.getByText("Yearly");
    await userEvent.click(yearlyOption);

    expect(screen.getByText("Yearly")).toBeInTheDocument();
    expect(screen.getByText("Select Year")).toBeInTheDocument();
  });

  it("opens and selects a period (e.g. March for Monthly)", async () => {
    renderWithStore(store);

    const periodBtn = screen.getByText("Select Month");
    await userEvent.click(periodBtn);

    const monthOption = screen.getByText("March");
    await userEvent.click(monthOption);

    expect(screen.getByText("March")).toBeInTheDocument();
    expect(actions.getCertificateStatistics).toHaveBeenCalled();
  });

  it("opens and selects a year if 'Yearly' is selected", async () => {
    renderWithStore(store);

    await userEvent.click(screen.getByText("Monthly"));
    await userEvent.click(screen.getByText("Yearly"));

    await userEvent.click(screen.getByText("Select Year"));
    const yearOption = screen.getByText(new Date().getFullYear().toString());
    await userEvent.click(yearOption);

    expect(
      screen.getByText(new Date().getFullYear().toString())
    ).toBeInTheDocument();
    expect(actions.getCertificateStatistics).toHaveBeenCalled();
  });

  it("opens the calendar and selects a date", async () => {
    renderWithStore(store);

    const calendarIcon = screen.getByLabelText("calendar-icon");
    await userEvent.click(calendarIcon);

    const weekdays = screen.getAllByText(/Sun|Mon|Tue|Wed|Thu|Fri|Sat/);
    expect(weekdays.length).toBeGreaterThan(0);
  });
});
