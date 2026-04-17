import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GuestForm from "../../components/GuestForm";

describe("GuestForm", () => {
  it("renders form fields", () => {
    render(<GuestForm open={true} onClose={vi.fn()} editGuest={undefined} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/group/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/plus one/i)).toBeInTheDocument();
  });
});
