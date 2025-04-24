import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DropDownBox from "../../../components/certificateRequest/components/CategoryDropDownBox";


describe("DropDownBox Component", () => {
  const mockHandleToggle = vi.fn();
  const mockSelectedCategory = { name: "Test Category" };

  it("renders with default placeholder when no category is selected", () => {
    render(
      <DropDownBox
        handleSelectCategoryToggle={mockHandleToggle}
        selectCategoryDropDownOpen={false}
        selectedCategory={null}
      />
    );

    expect(screen.getByText("Select Category")).toBeInTheDocument();
  });

  it("renders with selected category name when provided", () => {
    render(
      <DropDownBox
        handleSelectCategoryToggle={mockHandleToggle}
        selectCategoryDropDownOpen={false}
        selectedCategory={mockSelectedCategory}
      />
    );

    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.queryByText("Select Category")).not.toBeInTheDocument();
  });



  it("calls handleSelectCategoryToggle when clicked", () => {
    render(
      <DropDownBox
        handleSelectCategoryToggle={mockHandleToggle}
        selectCategoryDropDownOpen={false}
        selectedCategory={null}
      />
    );

    const dropdownBox = screen.getByText("Select Category").parentElement;
    fireEvent.click(dropdownBox);
    expect(mockHandleToggle).toHaveBeenCalledTimes(1);
  });

  it("has correct styling classes", () => {
    render(
      <DropDownBox
        handleSelectCategoryToggle={mockHandleToggle}
        selectCategoryDropDownOpen={false}
        selectedCategory={null}
      />
    );

    const dropdownBox = screen.getByText("Select Category").parentElement;
    expect(dropdownBox).toHaveClass("bg-white");
    expect(dropdownBox).toHaveClass("border");
    expect(dropdownBox).toHaveClass("rounded-[12px]");
    expect(dropdownBox).toHaveClass("cursor-pointer");
  });
});