import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import RequestSuccessModal from "../../../components/certificateRequest/components/RequestSuccessModal";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("RequestSuccessModal", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    mockDispatch.mockClear();
    mockNavigate.mockClear();
  });

  const mockStore = configureStore({
    reducer: {
      certificate: () => ({
        certificateRequestId: "abc123",
      }),
    },
  });

  const renderComponent = (props = {}) =>
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <RequestSuccessModal
            open={true}
            setOpenModal={vi.fn()}
            totalCertificate={5}
            type="Sent"
            {...props}
          />
        </BrowserRouter>
      </Provider>
    );

  it("renders modal with correct content", () => {
    renderComponent();
    expect(screen.getByText("Request Sent!")).toBeInTheDocument();
    expect(
      screen.getByText(/Your request for issuing 5 certificates is sent successfully!/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Go to Dashboard")).toBeInTheDocument();
    expect(screen.getByText("View Request Details")).toBeInTheDocument();
  });

  it("clicking 'Go to Dashboard' dispatches reset and navigates", () => {
    renderComponent();

    const dashboardButton = screen.getByText("Go to Dashboard");
    fireEvent.click(dashboardButton);

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("clicking 'View Request Details' dispatches reset and navigates", () => {
    renderComponent();

    const detailsButton = screen.getByText("View Request Details");
    fireEvent.click(detailsButton);

    expect(mockNavigate).toHaveBeenCalledWith("/logs/view-request/abc123");
  });
});
