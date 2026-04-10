import type { Guest } from "../types/guest.types";

export const useGuestsStats = (guests: Guest[]) => {
  const confirmed = guests.filter((g) => g.status === "confirmed");

  const attending = confirmed.reduce((acc: number, guest) => {
    return acc + 1 + (guest.plusOne === "outside the list" ? 1 : 0);
  }, 0);
  return {
    total: guests.length,
    confirmed: confirmed,
    attending: attending,
  };
};
