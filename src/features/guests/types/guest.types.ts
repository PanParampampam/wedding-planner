import type { Guest as PrismaGuest } from "../../../generated/prisma/client";
import type { GuestInvitationStatus, StoreActionTypes } from "src/shared/types/common.types";

export type Guest = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: {
    country: string | null;
    city: string | null;
    street: string | null;
    zipCode: string | null;
  } | null;
  status: GuestInvitationStatus;
  group: "family" | "friends" | "coworkers" | "other";
  plusOne: "on the list" | "outside the list" | "none";
  plusOneName: string | null;
  children?: number | null;
  dietaryRestrictions: "vegetarian" | "vegan" | "gluten free" | null;
  notes: string | null;
};

export type CreateGuest = Omit<PrismaGuest, "id">;

//store

type GuestsStateEntry = {
  actionType: StoreActionTypes;
  guestId: string;
  guestName: string;
};

type GuestsStateForm = {
  isOpen: boolean;
  guest: Guest | null;
};

export type GuestsState = {
  guest: GuestsStateEntry;
  form: GuestsStateForm;
  setGuest: (guestAction: GuestsStateEntry) => void;
  setForm: (formAction: GuestsStateForm) => void;
};
