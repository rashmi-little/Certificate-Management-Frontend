import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FileUploadProgressBar from "../../../components/certificateRequest/components/FileUploadProgressBar";;

describe("FileUploadProgressBar Component", () => {
  const mockCancelClick = vi.fn();
  const defaultProps = {
    fileName: "example.pdf",
    progress: 50,
    cancelClick: mockCancelClick,
    isFileProcessingError: false,
    fileProcessingErrorMessage: ""
  };

  it("renders correctly with default props", () => {
    render(<FileUploadProgressBar {...defaultProps} />);
    
    expect(screen.getByText("example.pdf")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });


  it("shows success icon when progress is 100%", () => {
    render(<FileUploadProgressBar {...defaultProps} progress={100} />);
    
    expect(screen.getByTestId("success-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("success-icon")).toHaveClass("bg-green-600");
  });

  it("calls cancelClick when button is clicked", () => {
    render(<FileUploadProgressBar {...defaultProps} />);
    
    fireEvent.click(screen.getByRole("button"));
    expect(mockCancelClick).toHaveBeenCalledTimes(1);
  });

  it("changes cancel button color in error state", () => {
    const { rerender } = render(<FileUploadProgressBar {...defaultProps} />);
    const path = screen.getByTestId("cancel-icon-path");
    expect(path).toHaveAttribute("stroke", "#757D8A");

    rerender(<FileUploadProgressBar {...defaultProps} isFileProcessingError={true} />);
    expect(path).toHaveAttribute("stroke", "#F22C2C");
  });
});