import type { Guest as GeneratedGuest } from "../../../generated/prisma/client";

export type Guest = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: {
    country: string | null;
    city: string | null;
    street: string | null;
    zipCode: string | null;
  } | null;
  status: "not yet invited" | "invited" | "confirmed" | "declined";
  group: "family" | "friends" | "coworkers" | "other";
  plusOne: "on the list" | "outside the list" | "none";
  plusOneName: string | null;
  dietaryRestrictions: "vegetarian" | "vegan" | "gluten free" | null;
  notes: string | null;
};

export type CreateGuest = Omit<GeneratedGuest, "id">;

export type GuestAction = {
  actionType: "created" | "deleted" | "updated";
  guestId: number;
  guestName: string;
};
