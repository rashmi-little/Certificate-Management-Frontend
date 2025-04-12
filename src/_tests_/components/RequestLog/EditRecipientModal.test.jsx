import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EditRecipientModal from "../../../components/RequestLog/EditRecipientModal";

const mockRecipient = {
  certificateData: JSON.stringify({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    salary: "50000",
    department: "Engineering",
    joiningMonth: "January",
    joiningYear: new Date().getFullYear().toString(),
  }),
};

describe("EditRecipientModal", () => {
  let onClose, onSave;

  beforeEach(() => {
    onClose = vi.fn();
    onSave = vi.fn();
  });

  it("should not render if open is false", () => {
    const { container } = render(
      <EditRecipientModal
        open={false}
        onClose={onClose}
        onSave={onSave}
        recipient={mockRecipient}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders modal with initial values when open is true", () => {
    render(
      <EditRecipientModal
        open={true}
        onClose={onClose}
        onSave={onSave}
        recipient={mockRecipient}
      />
    );

    expect(screen.getByText("Edit Recipient Details")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name")).toHaveValue("John");
    expect(screen.getByPlaceholderText("Last Name")).toHaveValue("Doe");
    expect(screen.getByPlaceholderText("user@example.com")).toHaveValue(
      "john@example.com"
    );
  });

  it("should update values and submit", () => {
    render(
      <EditRecipientModal
        open={true}
        onClose={onClose}
        onSave={onSave}
        recipient={mockRecipient}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByPlaceholderText("user@example.com"), {
      target: { value: "jane@example.com" },
    });

    fireEvent.click(screen.getByText("Save Changes"));

    expect(onSave).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("should call onClose when Cancel is clicked", () => {
    render(
      <EditRecipientModal
        open={true}
        onClose={onClose}
        onSave={onSave}
        recipient={mockRecipient}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();
  });
});
