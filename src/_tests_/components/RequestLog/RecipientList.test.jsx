import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RecipientsList from "../../../components/RequestLog/RecipientsList";
describe("RecipientsList component", () => {
  const mockSetOpenMenuId = vi.fn();
  const mockEditRecipient = vi.fn();
  const mockRemoveRecipient = vi.fn();
  const mockSafeJsonParse = vi.fn((data) => JSON.parse(data));

  const dummyRecipients = [
    {
      certificateId: "1",
      certificateData: JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      }),
    },
  ];

  it("should render recipients and handle menu click", () => {
    render(
      <RecipientsList
        recipients={dummyRecipients}
        openMenuId={null}
        setOpenMenuId={mockSetOpenMenuId}
        handleEditRecipient={mockEditRecipient}
        handleRemoveRecipient={mockRemoveRecipient}
        safeJsonParse={mockSafeJsonParse}
      />
    );

    expect(screen.getByText("Recipients")).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();

    
  });

  it('should show "No recipients available." when recipients is empty', () => {
    render(
      <RecipientsList
        recipients={[]}
        openMenuId={null}
        setOpenMenuId={mockSetOpenMenuId}
        handleEditRecipient={mockEditRecipient}
        handleRemoveRecipient={mockRemoveRecipient}
        safeJsonParse={mockSafeJsonParse}
      />
    );

    expect(screen.getByText("No recipients available.")).toBeInTheDocument();
  });
});
