import type { Guest } from "../types/guest.types";

export const guestsStatsHandler = (guests: Guest[]) => {
  const totalGuests = guests.length;
  const declined = guests.filter((g) => g.status === "declined").length;
  const totalEstimated = totalGuests - declined;
  const confirmed = guests.filter((g) => g.status === "confirmed");
  const notYetInvited = guests.filter((g) => g.status === "not yet invited").length;
  const invited = guests.filter((g) => g.status !== "not yet invited").length;
  const children = guests.filter((guest) => guest.isChild).length;

  const groupCounts = guests.reduce(
    (acc, guest) => {
      acc[guest.group] += 1;
      return acc;
    },
    { family: 0, friends: 0, coworkers: 0, other: 0 },
  );

  const attending = confirmed.reduce((acc: number, guest) => {
    return acc + 1 + (guest.plusOneId ? 1 : 0);
  }, 0);

  const dietaryCounts = guests.reduce(
    (acc, guest) => {
      if (guest.dietaryRestrictions === "vegetarian") acc.vegetarian += 1;
      if (guest.dietaryRestrictions === "vegan") acc.vegan += 1;
      if (guest.dietaryRestrictions === "gluten free") acc.glutenFree += 1;
      if (guest.dietaryRestrictions === "not sure yet") acc.unknown += 1;
      return acc;
    },
    { vegetarian: 0, vegan: 0, glutenFree: 0, unknown: 0 },
  );

  const staysOvernightCounts = guests.reduce(
    (acc, guest) => {
      if (guest.staysOvernight === "yes") acc.yes += 1;
      if (guest.staysOvernight === "not sure yet") acc.unknown += 1;
      return acc;
    },
    { yes: 0, unknown: 0 },
  );

  const needsTransportCounts = guests.reduce(
    (acc, guest) => {
      if (guest.needsTransportation === "yes") acc.yes += 1;
      if (guest.needsTransportation === "not sure yet") acc.unknown += 1;
      return acc;
    },
    { yes: 0, unknown: 0 },
  );

  const alcoholFreeCounts = guests.reduce(
    (acc, guest) => {
      if (guest.alcoholFree === "yes") acc.yes += 1;
      if (guest.alcoholFree === "not sure yet") acc.unknown += 1;
      return acc;
    },
    { yes: 0, unknown: 0 },
  );

  const side = guests.reduce(
    (acc, guest) => {
      if (guest.side === "both") acc.both += 1;
      if (guest.side === "bride") acc.bride += 1;
      if (guest.side === "groom") acc.groom += 1;
      return acc;
    },
    { both: 0, bride: 0, groom: 0 },
  );

  return {
    totalGuests: totalGuests,
    totalEstimated: totalEstimated,
    notYetInvited: notYetInvited,
    invited: invited,
    confirmed: confirmed.length,
    declined: declined,
    attending,
    children,
    groupCounts,
    dietaryCounts,
    staysOvernightCounts,
    needsTransportCounts,
    alcoholFreeCounts,
    side,
  };
};
