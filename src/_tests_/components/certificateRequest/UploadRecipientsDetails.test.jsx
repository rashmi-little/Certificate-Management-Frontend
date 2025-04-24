import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import UploadRecipientDetails from "../../../components/certificateRequest/components/UploadRecipientDetails";

vi.mock("../../../components/certificateRequest/components/MiniHeading", () => ({
  default: ({ title }) => <h3>{title}</h3>,
}));

vi.mock("../../../components/certificateRequest/components/RecipentForm", () => ({
  default: ({ fieldsConfig }) => (
    <div>
      <p>Mocked Recipient Form</p>
      <pre data-testid="fields">{JSON.stringify(fieldsConfig)}</pre>
    </div>
  ),
}));

describe("UploadRecipientDetails Component", () => {
  const mockStore = configureStore({
    reducer: {
      certificate: () => ({
        currentTemplateStructure: [
          { label: "Name", type: "text" },
          { label: "Email", type: "email" },
        ],
      }),
    },
  });

  it("renders heading and passes fieldsConfig to RecipentForm", () => {
    render(
      <Provider store={mockStore}>
        <UploadRecipientDetails />
      </Provider>
    );

    expect(screen.getByText("Upload Recipients Details")).toBeInTheDocument();
    expect(screen.getByText("Mocked Recipient Form")).toBeInTheDocument();
    expect(screen.getByTestId("fields")).toHaveTextContent(
      JSON.stringify([
        { label: "Name", type: "text" },
        { label: "Email", type: "email" },
      ])
    );
  });
});
