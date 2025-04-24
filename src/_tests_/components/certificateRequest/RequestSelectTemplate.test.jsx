import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import RequestSelectTemplate from "../../../components/certificateRequest/components/RequestSelectTemplate";

// Mock child components
vi.mock("../../../components/certificateRequest/components/MiniHeading", () => ({
  default: ({ title }) => <h3>{title}</h3>,
}));

vi.mock("../../../components/certificateRequest/components/CategoryDropDownBox", () => ({
  default: () => <div data-testid="category-dropdown">Category Dropdown</div>,
}));

vi.mock("../../../components/certificateRequest/components/DropDownMenu", () => ({
  default: () => <div data-testid="dropdown-menu">Dropdown Menu</div>,
}));

vi.mock("../../../components/certificateRequest/components/CertificateTemplate", () => ({
  default: ({ template }) => (
    <div data-testid="template">{template.name}</div>
  ),
}));

vi.mock("../../../components/certificateRequest/components/DownloadDropDownBox", () => ({
  default: () => <div data-testid="download-dropdown">Download</div>,
}));

describe("RequestSelectTemplate", () => {
  const renderComponent = (overrideState = {}, props = {}) => {
    const defaultState = {
      certificate: {
        selectedCategory: null,
        ...overrideState,
      },
    };

    const store = configureStore({
      reducer: {
        certificate: () => defaultState.certificate,
      },
    });

    const defaultProps = {
      handleSelectCategoryToggle: vi.fn(),
      selectCategoryDropDownOpen: false,
      categories: [{ certificateCategoryId: "cat123", name: "Category A" }],
      handleSelectCategoryChange: vi.fn(),
      templates: [],
      handleTemplateClick: vi.fn(),
      ...props,
    };

    return render(
      <Provider store={store}>
        <RequestSelectTemplate {...defaultProps} />
      </Provider>
    );
  };

  it("shows prompt when no category is selected", () => {
    renderComponent();
    expect(
      screen.getByText("Please select a category to view the templates.")
    ).toBeInTheDocument();
  });

  it("shows 'no template available' message if category is selected but templates are empty", () => {
    renderComponent({
      selectedCategory: { certificateCategoryId: "cat123", name: "Category A" },
    });

    expect(screen.getByText("Currently no template available")).toBeInTheDocument();
  });

  it("renders templates if category is selected and templates exist", () => {
    renderComponent(
      {
        selectedCategory: { certificateCategoryId: "cat123", name: "Category A" },
      },
      {
        templates: [
          { name: "Template 1", isActive: false },
          { name: "Template 2", isActive: true },
        ],
      }
    );

    expect(screen.getByText("Template 1")).toBeInTheDocument();
    expect(screen.getByText("Template 2")).toBeInTheDocument();
    expect(screen.getByTestId("download-dropdown")).toBeInTheDocument();
  });

  it("renders DropDownMenu when selectCategoryDropDownOpen is true", () => {
    renderComponent(
      {
        selectedCategory: { certificateCategoryId: "cat123", name: "Category A" },
      },
      {
        selectCategoryDropDownOpen: true,
      }
    );

    expect(screen.getByTestId("dropdown-menu")).toBeInTheDocument();
  });
});
