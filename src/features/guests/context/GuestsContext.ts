import { createContext } from "react";
import type { GuestAction } from "../types/guest.types";

export type guestActionContextType = {
  guestAction?: GuestAction;
  setGuestAction: React.Dispatch<React.SetStateAction<GuestAction | undefined>>;
};

export const GuestsContext = createContext<guestActionContextType | null>(null);
