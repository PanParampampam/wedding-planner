import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GuestItem from "../../components/GuestItem";
import type { Guest } from "../../types/guest.types";

describe("GuestItem", () => {
  const guest: Guest = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    address: {
      country: "Country",
      city: "City",
      street: "Street",
      zipCode: "12345",
    },
    status: "confirmed",
    group: "friends",
    plusOne: "none",
    plusOneName: null,
    dietaryRestrictions: null,
    notes: "VIP guest",
  };
  it("renders guest info", () => {
    render(<GuestItem guest={guest} openEditGuestForm={vi.fn()} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText(/email:/i)).toBeInTheDocument();
    expect(screen.getByText(/phone:/i)).toBeInTheDocument();
    expect(screen.getByText(/address:/i)).toBeInTheDocument();
    expect(screen.getByText(/notes:/i)).toBeInTheDocument();
  });
});
