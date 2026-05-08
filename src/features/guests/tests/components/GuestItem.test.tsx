import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GuestItem from "../../components/GuestList/GuestItem";
import type { Guest } from "../../types/guest.types";

describe("GuestItem", () => {
  const guest: Guest = {
    id: "1",
    name: "John",
    surname: "Doe",
    side: "both",
    isChild: false,
    alcoholFree: "no",
    staysOvernight: "yes",
    needsTransportation: "not sure yet",
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
    plusOneId: null,
    plusOneFullName: null,
    dietaryRestrictions: "none",
    notes: "VIP guest",
  };

  it("renders guest info", () => {
    render(<GuestItem guest={guest} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText(/email:/i)).toBeInTheDocument();
    expect(screen.getByText(/phone:/i)).toBeInTheDocument();
    expect(screen.getByText(/address:/i)).toBeInTheDocument();
    expect(screen.getByText(/notes:/i)).toBeInTheDocument();
  });

  it("does not render optional fields when empty", () => {
    render(
      <GuestItem guest={{ ...guest, email: null, phone: null, address: null, notes: null }} />,
    );
    expect(screen.queryByText(/email:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/phone:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/address:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/notes:/i)).not.toBeInTheDocument();
  });

  it("renders child label when guest is a child", () => {
    render(<GuestItem guest={{ ...guest, isChild: true }} />);
    expect(screen.getByText(/this guest is a child/i)).toBeInTheDocument();
  });

  it("renders plus one chip when present", () => {
    render(<GuestItem guest={{ ...guest, plusOneFullName: "Jane Doe" }} />);
    expect(screen.getByText(/\+1 of Jane Doe/i)).toBeInTheDocument();
  });
});
