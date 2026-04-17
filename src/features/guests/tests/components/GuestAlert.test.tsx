import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GuestAlert from "../../components/GuestAlert";
import { GuestsContext } from "../../context/GuestsContext";

describe("GuestAlert", () => {
  const renderWithContext = (
    actionType: "created" | "deleted" | "updated",
    guestName: string,
  ) => {
    return render(<GuestAlert />, {
      wrapper: ({ children }) => (
        <GuestsContext.Provider
          value={{
            guestAction: { actionType, guestId: 1, guestName },
            setGuestAction: vi.fn(),
          }}
        >
          {children}
        </GuestsContext.Provider>
      ),
    });
  };
  it("shows created alert", () => {
    renderWithContext("created", "Alice");
    expect(screen.getByText(/has been added/i)).toBeInTheDocument();
  });
  it("shows deleted alert", () => {
    renderWithContext("deleted", "Bob");
    expect(screen.getByText(/has been deleted/i)).toBeInTheDocument();
  });
  it("shows updated alert", () => {
    renderWithContext("updated", "Carol");
    expect(screen.getByText(/has been updated/i)).toBeInTheDocument();
  });
});
