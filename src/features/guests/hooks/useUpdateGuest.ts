import { useState } from "react";
import { updateGuest } from "../api/guests.api";
import type { Guest } from "../../../generated/prisma/client";
import { useGuestsStore } from "../store/guests.store";

export const useUpdateGuest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const { setGuest } = useGuestsStore();

  const handler = async (guest: Guest) => {
    setLoading(true);
    try {
      const response = await updateGuest(guest);
      if (response.success && response.guest) {
        setError("");
        setGuest({
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
