import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DropDownMenu from "../../../components/certificateRequest/components/DropDownMenu";

describe("DropDownMenu Component", () => {
  const mockCategories = [
    { certificateCategoryId: "1", name: "Category 1" },
    { certificateCategoryId: "2", name: "Category 2" },
    { certificateCategoryId: "3", name: "Category 3" },
  ];

  const mockHandleSelect = vi.fn();

  it("renders all categories correctly", () => {
    render(
      <DropDownMenu 
        categories={mockCategories} 
        handleSelectCategoryChange={mockHandleSelect} 
      />
    );

    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Category 2")).toBeInTheDocument();
    expect(screen.getByText("Category 3")).toBeInTheDocument();
  });


  it("calls handler with correct category when clicked", () => {
    render(
      <DropDownMenu 
        categories={mockCategories} 
        handleSelectCategoryChange={mockHandleSelect} 
      />
    );

    fireEvent.click(screen.getByText("Category 2"));
    expect(mockHandleSelect).toHaveBeenCalledWith(mockCategories[1]);
  });
});