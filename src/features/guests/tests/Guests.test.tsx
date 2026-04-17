import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import Guests from "../Guests";

describe("Guests", () => {
  it("renders the Guests component", () => {
    render(<Guests />);
    screen.debug();
  });

  it("displays the add a new guest button", () => {
    render(<Guests />);
    expect(screen.getByText("Add a new guest")).toBeInTheDocument();
  });
});
