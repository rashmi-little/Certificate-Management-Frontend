import { render, screen, fireEvent } from "@testing-library/react";
import RemoveRecipientModel from "../../../components/RequestLog/RemoveRecipientModel";
import { describe, it, expect, vi } from "vitest";

describe("RemoveRecipientModel", () => {
  const setup = (props = {}) => {
    const defaultProps = {
      open: true,
      onClose: vi.fn(),
      onConfirm: vi.fn(),
      isDeleting: false,
      ...props,
    };
    render(<RemoveRecipientModel {...defaultProps} />);
    return defaultProps;
  };

  it("renders modal when open is true", () => {
    setup();
    expect(screen.getByText("Remove user?")).toBeInTheDocument();
    expect(screen.getByText("Yes, remove Recipient!")).toBeInTheDocument();
    expect(screen.getByText("No, don’t remove")).toBeInTheDocument();
  });

  it("calls onClose when cancel button is clicked", () => {
    const { onClose } = setup();
    fireEvent.click(screen.getByText("No, don’t remove"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onConfirm when confirm button is clicked", () => {
    const { onConfirm } = setup();
    fireEvent.click(screen.getByText("Yes, remove Recipient!"));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("disables buttons when isDeleting is true", () => {
    setup({ isDeleting: true });
    expect(screen.getByText("Deleting...")).toBeDisabled();
    expect(screen.getByText("No, don’t remove")).toBeDisabled();
  });

  it("calls onClose when cross icon is clicked", () => {
    const { onClose } = setup();
    const closeIcon = screen.getByAltText("Cross");
    fireEvent.click(closeIcon);
    expect(onClose).toHaveBeenCalled();
  });
});
