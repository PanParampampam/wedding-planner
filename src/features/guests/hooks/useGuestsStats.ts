import type { Guest } from "../types/guest.types";

export const useGuestsStats = (guests: Guest[]) => {
  const confirmed = guests.filter((g) => g.status === "confirmed");
  const notYetInvited = guests.filter((g) => g.status === "not yet invited");
  const invited = guests.filter((g) => g.status !== "not yet invited");
  const declined = guests.filter((g) => g.status === "declined");
  const children = guests.reduce((acc, guest) => acc + (guest.children ?? 0), 0);

  const groupCounts = guests.reduce(
    (acc, guest) => {
      acc[guest.group] += 1;
      return acc;
    },
    { family: 0, friends: 0, coworkers: 0, other: 0 },
  );

  const attending = confirmed.reduce((acc: number, guest) => {
    return acc + 1 + (guest.plusOne === "outside the list" ? 1 : 0);
  }, 0);

  const dietaryCounts = guests.reduce(
    (acc, guest) => {
      if (guest.dietaryRestrictions === "vegetarian") acc.vegetarian += 1;
      if (guest.dietaryRestrictions === "vegan") acc.vegan += 1;
      if (guest.dietaryRestrictions === "gluten free") acc.glutenFree += 1;
      return acc;
    },
    { vegetarian: 0, vegan: 0, glutenFree: 0 },
  );

  return {
    total: guests.length,
    notYetInvited: notYetInvited.length,
    invited: invited.length,
    confirmed: confirmed.length,
    declined: declined.length,
    attending,
    children,
    groupCounts,
    dietaryCounts,
  };
};
