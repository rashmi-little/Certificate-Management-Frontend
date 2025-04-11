import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RequestViewHeader from "../../../components/RequestLog/RequestViewHeader";
describe("RequestViewHeader", () => {
  it("should render the header title and call onBackClick when icon is clicked", () => {
    const onBackClickMock = vi.fn();

    render(<RequestViewHeader onBackClick={onBackClickMock} />);

    expect(screen.getByText("Request")).toBeInTheDocument();

    const svgIcon = document.querySelector("svg");
    expect(svgIcon).toBeTruthy();

    fireEvent.click(svgIcon);

    expect(onBackClickMock).toHaveBeenCalledTimes(1);
  });
});
