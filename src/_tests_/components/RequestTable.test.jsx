import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import RequestTable from "../../components/RequestTable";
import * as actions from "../../redux/certificate/Action";
import { BrowserRouter } from "react-router-dom";

vi.mock("../../redux/certificate/Action", () => ({
  getScheduleRequestInfo: vi.fn(() => ({ type: "MOCK_ACTION" })),
}));

const mockStore = configureStore([]);
const mockData = [
  {
    certificateRequestId: "REQ001",
    templateName: "Template A",
    noOfCertificates: 100,
    categoryName: "Category A",
    scheduledDate: "2025-04-10",
    status: "Scheduled",
  },
  {
    certificateRequestId: "REQ002",
    templateName: "Template B",
    noOfCertificates: 50,
    categoryName: "Category B",
    scheduledDate: "2025-04-15",
    status: "In Progress",
  },
];

const renderComponent = (data = mockData) => {
  const store = mockStore({
    certificate: {
      scheduleRequestInfoData: data,
    },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <RequestTable />
      </BrowserRouter>
    </Provider>
  );
};

describe("RequestTable Component", () => {
  it("renders the header and count text", () => {
    renderComponent();
    expect(screen.getByText("Scheduled Requests")).toBeInTheDocument();
    expect(screen.getByText("(2/2)")).toBeInTheDocument();
  });

  it("dispatches getScheduleRequestInfo on mount", () => {
    renderComponent();
    expect(actions.getScheduleRequestInfo).toHaveBeenCalled();
  });

  it("renders rows based on redux state", () => {
    renderComponent();
    expect(screen.getByText("REQ001")).toBeInTheDocument();
    expect(screen.getByText("REQ002")).toBeInTheDocument();
  });

  it("limits visible requests to 5 and shows (5/total)", () => {
    const moreThanFive = Array.from({ length: 7 }, (_, i) => ({
      certificateRequestId: `REQ00${i + 1}`,
      templateName: `Template ${i + 1}`,
      noOfCertificates: i * 10,
      categoryName: `Category ${i + 1}`,
      scheduledDate: "2025-04-10",
      status: "Scheduled",
    }));

    renderComponent(moreThanFive);

    // Only 5 should be visible
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(`REQ00${i}`)).toBeInTheDocument();
    }

    // Should display count (5/7)
    expect(screen.getByText("(5/7)")).toBeInTheDocument();
  });
});
