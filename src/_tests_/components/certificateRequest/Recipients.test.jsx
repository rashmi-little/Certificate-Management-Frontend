import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Recipients from "../../../components/certificateRequest/components/Recipients";

// Mock MiniHeading component
vi.mock("../../../components/certificateRequest/components/MiniHeading", () => ({
  default: () => <h3 data-testid="mini-heading">Recipients</h3>,
}));

// Mock RecipientsList component
vi.mock("../../../components/certificateRequest/components/RecipientsList", () => ({
  default: ({ setShowDeleteModal }) => (
    <div data-testid="recipients-list">
      <button onClick={() => setShowDeleteModal(true)}>Remove Recipient</button>
    </div>
  ),
}));

// Mock RemoveRecipientModel component
vi.mock("../../../components/certificateRequest/components/RemoveRecipientModel", () => ({
  default: ({ open, onClose, onConfirm }) =>
    open && (
      <div data-testid="delete-modal">
        <button onClick={onClose}>Cancel</button>
        <button onClick={onConfirm}>Confirm Delete</button>
      </div>
    ),
}));

describe("Recipients Component", () => {
  const store = configureStore({
    reducer: {
      certificate: () => ({
        currentSelectedRecipient: { id: "123", name: "Test Recipient" },
      }),
    },
  });

  it("renders heading and recipients list", () => {
    render(
      <Provider store={store}>
        <Recipients />
      </Provider>
    );

    expect(screen.getByTestId("mini-heading")).toBeInTheDocument();
    expect(screen.getByTestId("recipients-list")).toBeInTheDocument();
    expect(screen.queryByTestId("delete-modal")).not.toBeInTheDocument();
  });

  it("opens and closes delete modal", () => {
    render(
      <Provider store={store}>
        <Recipients />
      </Provider>
    );

    fireEvent.click(screen.getByText("Remove Recipient"));
    expect(screen.getByTestId("delete-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByTestId("delete-modal")).not.toBeInTheDocument();
  });
});
