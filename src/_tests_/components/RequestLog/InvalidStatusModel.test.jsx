import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import InvalidStatusModel from "../../../components/RequestLog/InvalidStatusModel";
describe("InvalidStatusModel", () => {
  it("renders modal content and handles close", () => {
    const setOpenModalMock = vi.fn();

    render(<InvalidStatusModel open={true} setOpenModal={setOpenModalMock} />);

    expect(screen.getByText("Invalid Status")).toBeInTheDocument();
    expect(
      screen.getByText("Only Scheduled requests can be edited!")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Close/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Close/i }));

    expect(setOpenModalMock).toHaveBeenCalledWith(false);
    expect(setOpenModalMock).toHaveBeenCalledTimes(1);
  });
});
