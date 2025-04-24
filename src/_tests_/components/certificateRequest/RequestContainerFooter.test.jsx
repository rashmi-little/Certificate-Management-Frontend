import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import RequestContainerFooter from "../../../components/certificateRequest/components/RequestContainerFooter";

const mockDispatch = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: actual.useSelector,
  };
});

describe("RequestContainerFooter Component", () => {
  const mockHandleDoItLaterClick = vi.fn();

  const createStore = (stepperValue = 0, footerSubmitStatus = true, selectedTemplateId = "t1", templates = [{ templateId: "t1", isActive: false }, { templateId: "t2", isActive: true }]) =>
    configureStore({
      reducer: {
        certificate: () => ({
          stepperValue,
          footerSubmitStatus,
          selectedTemplate: { templateId: selectedTemplateId },
          templates,
        }),
      },
    });

  it("renders buttons for step 0", () => {
    const store = createStore(0);
    render(
      <Provider store={store}>
        <RequestContainerFooter handleDoItLaterClick={mockHandleDoItLaterClick} />
      </Provider>
    );
    expect(screen.getByText("Add Recipients")).toBeInTheDocument();
    expect(screen.getByText("Do it later")).toBeInTheDocument();
  });

  it("dispatches correct actions on submit click", () => {
    const store = createStore(1, true, "t1");

    render(
      <Provider store={store}>
        <RequestContainerFooter handleDoItLaterClick={mockHandleDoItLaterClick} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Send/Schedule"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "RESET_RECIPIENT",
      payload: [],
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "RESET_PROGRESS_BAR" });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SELECTED_TEMPLATE",
      payload: { templateId: "t2", isActive: true },
    });
  });
});
