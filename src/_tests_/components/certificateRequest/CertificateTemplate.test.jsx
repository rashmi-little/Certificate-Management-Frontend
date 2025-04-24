import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import CertificateTemplate from "../../../components/certificateRequest/components/CertificateTemplate";

// Mock the image import
vi.mock("../../../assets/vector/certificate-dummy-template.png", () => ({
  default: "dummy-template.png", // Add default property
}));

// Mock store setup
const createMockStore = (selectedTemplateId = null) => {
  return configureStore({
    reducer: {
      certificate: () => ({
        selectedTemplate: selectedTemplateId
          ? { templateId: selectedTemplateId }
          : null,
      }),
    },
  });
};

describe("CertificateTemplate Component", () => {
  const mockTemplate = {
    id: "1",
    templateId: "template-123",
    imageLink: "dummy-template.png",
    isActive: false,
  };

  const mockHandleClick = vi.fn();

  it("renders with basic styling when not active", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <CertificateTemplate
          template={mockTemplate}
          handleTemplateClick={mockHandleClick}
        />
      </Provider>
    );

    const templateContainer = screen.getByTestId("template-container");
    expect(templateContainer).toHaveClass("border-[#DEE0E3]");
    expect(templateContainer).toHaveClass("bg-[#FAFAFA]");
    expect(templateContainer).not.toHaveClass("border-[#408DFF]");
    expect(templateContainer).not.toHaveClass("bg-[#0066FF]/[0.1]");
  });

  it("renders with active styling when isActive is true", () => {
    const activeTemplate = { ...mockTemplate, isActive: true };
    const store = createMockStore();
    render(
      <Provider store={store}>
        <CertificateTemplate
          template={activeTemplate}
          handleTemplateClick={mockHandleClick}
        />
      </Provider>
    );

    const templateContainer = screen.getByTestId("template-container");
    expect(templateContainer).toHaveClass("border-[#408DFF]");
    expect(templateContainer).toHaveClass("bg-[#0066FF]/[0.1]");
  });

  it("displays the correct template image", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <CertificateTemplate
          template={mockTemplate}
          handleTemplateClick={mockHandleClick}
        />
      </Provider>
    );

    const image = screen.getByAltText("template image");
    expect(image).toHaveAttribute("src", "dummy-template.png");
    expect(image).toHaveClass("rounded-xl");
    expect(image).toHaveClass("object-contain");
  });

  it("shows active checkmark when template is active", () => {
    const activeTemplate = { ...mockTemplate, isActive: true };
    const store = createMockStore();
    render(
      <Provider store={store}>
        <CertificateTemplate
          template={activeTemplate}
          handleTemplateClick={mockHandleClick}
        />
      </Provider>
    );

    const activeCheckmark = screen.getByTestId("active-checkmark");
    expect(activeCheckmark).toBeInTheDocument();
  });

    it("shows inactive circle when template is not active", () => {
      const store = createMockStore();
      render(
        <Provider store={store}>
          <CertificateTemplate
            template={mockTemplate}
            handleTemplateClick={mockHandleClick}
          />
        </Provider>
      );

      const inactiveCircle = screen.getByTestId("inactive-circle");
      expect(inactiveCircle).toBeInTheDocument();
    });

    it("calls handleTemplateClick with templateId when clicked", () => {
      const store = createMockStore();
      render(
        <Provider store={store}>
          <CertificateTemplate
            template={mockTemplate}
            handleTemplateClick={mockHandleClick}
          />
        </Provider>
      );

      const templateContainer = screen.getByTestId("template-container");
      fireEvent.click(templateContainer);
      expect(mockHandleClick).toHaveBeenCalledWith("template-123");
    });

});
