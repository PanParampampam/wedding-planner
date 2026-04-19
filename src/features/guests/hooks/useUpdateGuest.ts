import { useState, useContext } from "react";
import { updateGuest } from "../api/guests.api";
import { GuestsContext } from "../context/GuestsContext";
import type { Guest } from "../../../generated/prisma/client";

export const useUpdateGuest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const guestsContext = useContext(GuestsContext);

  const handler = async (guest: Guest) => {
    setLoading(true);
    try {
      const response = await updateGuest(guest);
      if (response.success && response.guest) {
        setError("");
        guestsContext?.setGuestAction({
          actionType: "updated",
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
