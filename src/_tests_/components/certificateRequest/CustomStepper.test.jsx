import React from "react";
import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import CustomStepper from "../../../components/certificateRequest/components/CustomStepper";

// Mock store with certificate slice
const createMockStore = (stepperValue) => {
  return configureStore({
    reducer: {
      certificate: () => ({
        stepperValue,
      }),
    },
  });
};

describe("CustomStepper Component", () => {
  it("renders correctly with step 0 (Select Template)", () => {
    const store = createMockStore(0);
    render(
      <Provider store={store}>
        <CustomStepper />
      </Provider>
    );

    // Check step 1 is active
    const step1 = screen.getByText("1");
    expect(step1).toBeInTheDocument();
    expect(step1.parentElement).toHaveClass("bg-[#FAFAFA]");
    expect(step1.parentElement).toHaveClass("text-blue-500");
    expect(step1.parentElement).toHaveClass("border-blue-500");

    // Check step 2 is inactive
    const step2 = screen.getByText("2");
    expect(step2).toBeInTheDocument();
    expect(step2.parentElement).toHaveClass("border-[#DEE0E3]");

    // Check step 3 is inactive
    const step3 = screen.getByText("3");
    expect(step3).toBeInTheDocument();
    expect(step3.parentElement).toHaveClass("border-[#DEE0E3]");
  });

  it("renders correctly with step 1 (Add Recipients)", () => {
    const store = createMockStore(1);
    render(
      <Provider store={store}>
        <CustomStepper />
      </Provider>
    );

    // Check step 1 is completed
    const step1 = screen.getByText("✔");
    expect(step1).toBeInTheDocument();
    expect(step1.parentElement).toHaveClass("bg-[#408DFF]");

    // Check step 2 is active
    const step2 = screen.getByText("2");
    expect(step2).toBeInTheDocument();
    expect(step2.parentElement).toHaveClass("bg-[#FAFAFA]");
    expect(step2.parentElement).toHaveClass("text-blue-500");
    expect(step2.parentElement).toHaveClass("border-blue-500");

    // Check step 3 is inactive
    const step3 = screen.getByText("3");
    expect(step3).toBeInTheDocument();
    expect(step3.parentElement).toHaveClass("border-[#DEE0E3]");
  });

  it("renders correctly with step 2 (Schedule)", () => {
    const store = createMockStore(2);
    render(
      <Provider store={store}>
        <CustomStepper />
      </Provider>
    );

    const checkmarks = screen.getAllByText("✔");
    expect(checkmarks).toHaveLength(2); // Verify we have exactly 2 checkmarks

    // Test Step 1 checkmark (should be completed)
    const step1Checkmark = checkmarks[0];
    expect(step1Checkmark).toBeInTheDocument();
    expect(step1Checkmark.parentElement).toHaveClass("bg-[#408DFF]");
    expect(step1Checkmark.parentElement).toHaveClass("border-blue-500");
    expect(step1Checkmark).toHaveClass("text-[#FAFAFA]");

    // Test Step 2 checkmark (should be completed)
    const step2Checkmark = checkmarks[1];
    expect(step2Checkmark).toBeInTheDocument();
    expect(step2Checkmark.parentElement).toHaveClass("bg-[#408DFF]");
    expect(step2Checkmark.parentElement).toHaveClass("border-blue-500");
    expect(step2Checkmark).toHaveClass("text-[#FAFAFA]");

    // Verify step 3 is active (should show "3", not checkmark)
    const step3 = screen.getByText("3");
    expect(step3).toBeInTheDocument();
    expect(step3.parentElement).toHaveClass("bg-[#FAFAFA]");
    expect(step3.parentElement).toHaveClass("border-blue-500");
    expect(step3.parentElement).toHaveClass("text-blue-500");
  });

    it("renders correctly when all steps are completed", () => {
      const store = createMockStore(3);
      render(
        <Provider store={store}>
          <CustomStepper />
        </Provider>
      );

      // All steps should show checkmarks
      const checkmarks = screen.getAllByText("✔");
      expect(checkmarks).toHaveLength(3);

      // All steps should have completed styling
      checkmarks.forEach((checkmark) => {
        expect(checkmark.parentElement).toHaveClass("bg-[#408DFF]");
      });

    });
});
