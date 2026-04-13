import { useState, useContext } from "react";
import { createGuest } from "../api/guests.api";
import type { CreateGuest } from "../types/guest.types";
import { GuestsContext } from "../context/GuestsContext";

export const useCreateGuest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const guestsContext = useContext(GuestsContext);

  const handler = async (guest: CreateGuest) => {
    setLoading(true);
    try {
      const response = await createGuest(guest);
      if (response.success && response.guest) {
        setError("");
        guestsContext?.setGuestAction({
          actionType: "created",
          guestId: response.guest.id,
          guestName: response.guest.name,
        });
        return true;
      } else {
        throw new Error(response.message);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handler, loading, error };
};
