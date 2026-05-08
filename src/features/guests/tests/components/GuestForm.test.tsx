import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import GuestForm from "../../components/GuestForm";

vi.mock("../../store/guests.store", () => ({
  useGuestsStore: () => ({
    form: { isOpen: true, guest: null },
    setForm: vi.fn(),
  }),
}));

vi.mock("../../hooks/useCreateGuest", () => ({
  useCreateGuest: () => ({ handler: vi.fn(), loading: false, error: null }),
}));

vi.mock("../../hooks/useUpdateGuest", () => ({
  useUpdateGuest: () => ({ handler: vi.fn(), loading: false, error: null }),
}));

const defaultProps = {
  plusOneList: [],
  allGuestsList: [],
};

describe("GuestForm", () => {
  it("renders basic form fields", () => {
    render(<GuestForm {...defaultProps} />);
    expect(screen.getByLabelText(/^name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/surname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/group/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/side/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/plus one/i)).toBeInTheDocument();
  });

  it("does not show email and phone fields by default", () => {
    render(<GuestForm {...defaultProps} />);
    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/phone/i)).not.toBeInTheDocument();
  });

  it("shows email and phone fields after checking the contact checkbox", async () => {
    render(<GuestForm {...defaultProps} />);
    await userEvent.click(screen.getByLabelText(/add the contact details/i));
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
  });

  it("shows the create button for a new guest", () => {
    render(<GuestForm {...defaultProps} />);
    expect(screen.getByRole("button", { name: /create guest/i })).toBeInTheDocument();
  });
});
