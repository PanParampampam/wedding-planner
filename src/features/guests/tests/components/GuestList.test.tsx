import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import GuestsDashboard from "../../components/GuestsDashboard";

describe("GuestsDashboard", () => {
  let spy: ReturnType<typeof vi.spyOn>;
  afterEach(() => {
    spy?.mockRestore();
  });

  it("renders loading state", async () => {
    const hooks = await import("../../hooks/useFetchGuests");
    spy = vi
      .spyOn(hooks, "useFetchGuests")
      .mockReturnValue({ guests: [], loading: true, error: false });
    render(<GuestsDashboard />);
    expect(screen.getByText(/guest list/i)).toBeInTheDocument();
  });

  it("renders error state", async () => {
    const hooks = await import("../../hooks/useFetchGuests");
    spy = vi
      .spyOn(hooks, "useFetchGuests")
      .mockReturnValue({ guests: [], loading: false, error: true });
    render(<GuestsDashboard />);
    expect(screen.getByText(/failed to load guests/i)).toBeInTheDocument();
  });

  it("renders empty state", async () => {
    const hooks = await import("../../hooks/useFetchGuests");
    spy = vi
      .spyOn(hooks, "useFetchGuests")
      .mockReturnValue({ guests: [], loading: false, error: false });
    render(<GuestsDashboard />);
    expect(screen.getByText(/no guests found/i)).toBeInTheDocument();
  });
});
