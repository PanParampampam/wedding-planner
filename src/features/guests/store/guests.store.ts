import { create } from "zustand";
import type { GuestsState } from "../types/guest.types";

export const useGuestsStore = create<GuestsState>((set) => ({
  guest: {
    actionType: null,
    guestId: "",
    guestName: "",
  },
  form: {
    isOpen: false,
    guest: null,
  },
  setGuest: (newGuestAction) => set(() => ({ guest: newGuestAction })),
  setForm: (newFormAction) => set(() => ({ form: newFormAction })),
}));
