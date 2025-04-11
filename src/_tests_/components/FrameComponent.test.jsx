import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { FrameComponent } from "../../components/StatisticsFrameComponent";
import configureStore from "redux-mock-store";
import React from "react";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureStore([]);

describe("FrameComponent", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      certificate: {
        data: {
          totalRequests: 100,
          requestsGrowth: "10%",
          scheduledRequests: 70,
          scheduledRequestsGrowth: "5%",
          failedRequests: 10,
          failedRequestGrowth: "-2%",
          issuedCertificates: 90,
          certificatesGrowth: "12%",
          newUsers: 15,
          usersGrowth: "8%",
          raisedTickets: 4,
          ticketsGrowth: "1%",
        },
      },
    });
  });

  const renderWithStore = (store) =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FrameComponent />
        </BrowserRouter>
      </Provider>
    );

  it("renders all 6 FrameItems with correct titles", () => {
    renderWithStore(store);

    const titles = [
      "Total Requests",
      "Scheduled Requests",
      "Failed Requests",
      "Certificates Issued",
      "Users Added",
      "Tickets Received",
    ];

    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("displays correct values from redux state", () => {
    renderWithStore(store);

    expect(screen.getByText("100")).toBeInTheDocument(); // totalRequests
    expect(screen.getByText("70")).toBeInTheDocument(); // scheduledRequests
    expect(screen.getByText("10")).toBeInTheDocument(); // failedRequests
    expect(screen.getByText("90")).toBeInTheDocument(); // issuedCertificates
    expect(screen.getByText("15")).toBeInTheDocument(); // newUsers
    expect(screen.getByText("4")).toBeInTheDocument(); // raisedTickets
  });

  it("renders titles even when certificate data is undefined", () => {
    const emptyStore = mockStore({
      certificate: {
        data: undefined,
      },
    });

    renderWithStore(emptyStore);

    const titles = [
      "Total Requests",
      "Scheduled Requests",
      "Failed Requests",
      "Certificates Issued",
      "Users Added",
      "Tickets Received",
    ];

    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
