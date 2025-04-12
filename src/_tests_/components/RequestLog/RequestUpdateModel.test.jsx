import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RequestUpdateModel from "../../../components/RequestLog/RequestUpdateModel";
describe("RequestUpdateModel", () => {
  it("should render the modal content when open is true", () => {
    const mockSetOpen = vi.fn();

    render(
      <RequestUpdateModel
        open={true}
        setOpenModal={mockSetOpen}
        requestId={123}
        type="Request"
      />
    );

    expect(screen.getByText("Request Saved")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The new changes to the Request(ID-123) saved successfully."
      )
    ).toBeInTheDocument();

    const doneButton = screen.getByRole("button", { name: /done/i });
    expect(doneButton).toBeInTheDocument();

    fireEvent.click(doneButton);
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it("should not render the modal when open is false", () => {
    const mockSetOpen = vi.fn();

    const { queryByText } = render(
      <RequestUpdateModel
        open={false}
        setOpenModal={mockSetOpen}
        requestId={456}
        type="Update"
      />
    );

    expect(queryByText("Update Saved")).not.toBeInTheDocument();
  });
});
