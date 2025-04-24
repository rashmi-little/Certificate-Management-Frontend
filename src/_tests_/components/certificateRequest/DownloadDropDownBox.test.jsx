import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DownloadDropDownBox from "../../../components/certificateRequest/components/DownloadDropDownBox";

vi.mock("../../../assets/vector/downwardArrow.png", () => ({
  default: "downward-arrow.png"
}));

describe("DownloadDropDownBox Component", () => {
  const mockTemplate = {
    templateId: "template-123",
    sampleDataLink: "/sample-data.xlsx"
  };

  it("renders download button with correct text and icon", () => {
    render(<DownloadDropDownBox template={mockTemplate} />);
    
    expect(screen.getByText("Download Sample data")).toBeInTheDocument();
    expect(screen.getByAltText("Icon")).toBeInTheDocument();
  });

  it("triggers click on hidden link when clicked", () => {
    const mockClick = vi.fn();
    render(<DownloadDropDownBox template={mockTemplate} />);
    
    const downloadLink = screen.getByText("Download");
    downloadLink.onclick = mockClick;
    
    fireEvent.click(screen.getByText("Download Sample data").parentElement);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});