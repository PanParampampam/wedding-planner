import type { Guest as PrismaGuest } from "../../../generated/prisma/client";
import type { GuestInvitationStatus, StoreActionTypes } from "src/shared/types/common.types";

export type GuestPreferenceState = "yes" | "no" | "not sure yet";

export type Guest = {
  id: string;
  name: string;
  surname: string;
  side: "bride" | "groom" | "both";
  isChild: boolean;
  alcoholFree: GuestPreferenceState;
  staysOvernight: GuestPreferenceState;
  needsTransportation: GuestPreferenceState;
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
  plusOneId: string | null;
  dietaryRestrictions: "vegetarian" | "vegan" | "gluten free" | "not sure yet" | "none";
  notes: string | null;
};

export type PlusOne = {
  id: string;
  fullName: string;
};

export type CreateGuest = Omit<PrismaGuest, "id" | "userId">;

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
