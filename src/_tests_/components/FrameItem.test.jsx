import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FrameItem } from "../../components/StatisticsFrameItem";
import { BrowserRouter } from "react-router-dom";

vi.mock("../../assets/Dashboard/ExternalLink.svg", () => ({
  default: "mocked-external-link.svg",
}));

const baseItem = {
  title: "Total Requests",
  value: 1200,
  growth: 15,
};

describe("FrameItem Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <FrameItem item={baseItem} />
      </BrowserRouter>
    );
  });

  it("renders title, value and growth correctly", () => {
    expect(screen.getByText("Total Requests")).toBeInTheDocument();
    expect(screen.getByText("1200")).toBeInTheDocument();
    expect(screen.getByText("15%")).toBeInTheDocument();
  });

  it("applies green color for positive growth on increasing metric", () => {
    const growthText = screen.getByText("15%");
    expect(growthText).toHaveStyle("color: #0FE665");
  });

  it("shows tooltip on hover", () => {
    const infoDot = screen.getByText("Total Requests").nextSibling;

    // Before hover, tooltip shouldn't be in the document
    let tooltips = screen.queryAllByText((_, element) =>
      element?.textContent?.includes("Total Requests during this period")
    );
    expect(tooltips.length).toBe(0);

    // Hover
    fireEvent.mouseEnter(infoDot);

    tooltips = screen.getAllByText((_, element) =>
      element?.textContent?.includes("Total Requests during this period")
    );
    expect(tooltips.length).toBeGreaterThan(0);

    // Unhover
    fireEvent.mouseLeave(infoDot);

    tooltips = screen.queryAllByText((_, element) =>
      element?.textContent?.includes("Total Requests during this period")
    );
    expect(tooltips.length).toBe(0);
  });

  it("renders external link image", () => {
    const image = screen.getByAltText("External Link");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "mocked-external-link.svg");
  });
});
