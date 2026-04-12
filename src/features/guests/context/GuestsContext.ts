import { createContext } from "react";

export type NewGuestContextType = {
  newGuest: boolean;
  setNewGuest: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GuestsContext = createContext<NewGuestContextType | null>(null);
