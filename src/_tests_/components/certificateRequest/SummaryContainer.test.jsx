import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SummaryContainer from "../../../components/certificateRequest/components/SummaryContainer";

// Mock MiniHeading
vi.mock("../../../components/certificateRequest/components/MiniHeading", () => ({
  default: ({ title }) => <h3>{title}</h3>,
}));

// Mock RecipientsList
vi.mock("../../../components/certificateRequest/components/RecipientsList", () => {
    const { useSelector } = require("react-redux");
    return {
      default: ({ setShowDeleteModal }) => {
        const recipients = useSelector((state) => state.certificate.recipients);
        if (!recipients || recipients.length === 0) return null;
  
        return (
          <button onClick={() => setShowDeleteModal(true)}>
            Remove Recipient
          </button>
        );
      },
    };
  });

// Mock RemoveRecipientModel
vi.mock("../../../components/certificateRequest/components/RemoveRecipientModel", () => ({
  default: ({ open, onClose, onConfirm }) =>
    open && (
      <div data-testid="delete-modal">
        <button onClick={onClose}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    ),
}));

describe("SummaryContainer", () => {
    const mockStore = configureStore({
        reducer: {
          certificate: () => ({
            selectedTemplate: {
              templateId: "tpl123",
              imageLink: "https://example.com/image.png",
            },
            currentSelectedRecipient: {
              id: "1",
              name: "John Doe",
            },
            recipients: [{ id: "1", name: "John Doe" }],
          }),
        },
      });

  it("renders heading and selected template image", () => {
    render(
      <Provider store={mockStore}>
        <SummaryContainer />
      </Provider>
    );

    expect(screen.getByText("Summary")).toBeInTheDocument();
    expect(screen.getByAltText("image")).toBeInTheDocument();
  });

  it("opens and confirms delete modal", () => {
    render(
      <Provider store={mockStore}>
        <SummaryContainer />
      </Provider>
    );

    fireEvent.click(screen.getByText("Remove Recipient"));
    expect(screen.getByTestId("delete-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Confirm"));
  });
});
