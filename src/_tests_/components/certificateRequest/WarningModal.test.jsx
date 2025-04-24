import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import WarningModal from "../../../components/certificateRequest/components/WarningModal"; // Adjust the path accordingly

describe("WarningModal", () => {
  it("renders warning modal with correct text and icon", () => {
    const setOpenModal = vi.fn();

    render(<WarningModal open={true} setOpenModal={setOpenModal} />);

    expect(screen.getByText("Invalid File format")).toBeInTheDocument();
    expect(screen.getByText("Please provide only .xlsx file")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("calls setOpenModal(false) when Close button is clicked", () => {
    const setOpenModal = vi.fn();

    render(<WarningModal open={true} setOpenModal={setOpenModal} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(setOpenModal).toHaveBeenCalledWith(false);
  });
});
