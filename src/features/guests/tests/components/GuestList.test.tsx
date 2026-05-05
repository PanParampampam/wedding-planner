import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import GuestList from "../../components/GuestsDashboard";

describe("GuestList", () => {
  let spy: ReturnType<typeof vi.spyOn>;
  afterEach(() => {
    spy?.mockRestore();
  });

  it("renders loading state", async () => {
    const hooks = await import("../../hooks/useFetchGuests");
    spy = vi.spyOn(hooks, "useGuests").mockReturnValue({ guests: [], loading: true, error: false });
    render(<GuestList openEditGuestForm={vi.fn()} />);
    expect(screen.getByText(/guest list/i)).toBeInTheDocument();
  });

  it("renders error state", async () => {
    const hooks = await import("../../hooks/useFetchGuests");
    spy = vi.spyOn(hooks, "useGuests").mockReturnValue({ guests: [], loading: false, error: true });
    render(<GuestList openEditGuestForm={vi.fn()} />);
    expect(screen.getByText(/failed to load guests/i)).toBeInTheDocument();
  });

  it("renders empty state", async () => {
    const hooks = await import("../../hooks/useFetchGuests");
    spy = vi
      .spyOn(hooks, "useGuests")
      .mockReturnValue({ guests: [], loading: false, error: false });
    render(<GuestList openEditGuestForm={vi.fn()} />);
    expect(screen.getByText(/no guests found/i)).toBeInTheDocument();
  });
});
