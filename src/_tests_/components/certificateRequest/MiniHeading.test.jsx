import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MiniHeading from "../../../components/certificateRequest/components/MiniHeading";;

describe("MiniHeading Component", () => {
  it("renders the title correctly", () => {
    const testTitle = "Test Heading";
    render(<MiniHeading title={testTitle} />);
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  it("has the correct base styling", () => {
    render(<MiniHeading title="Test" />);
    const heading = screen.getByText("Test");
    
    expect(heading).toHaveClass("font-roboto");
    expect(heading).toHaveClass("font-medium");
    expect(heading).toHaveClass("text-[#394555]");
    expect(heading).toHaveClass("leading-[100%]");
  });

  it("applies responsive text sizing", () => {
    render(<MiniHeading title="Test" />);
    const heading = screen.getByText("Test");
    
    expect(heading).toHaveClass("text-[20px]");
    expect(heading).toHaveClass("md:text-[16px]");
    expect(heading).toHaveClass("lg:text-[20px]");
  });
});