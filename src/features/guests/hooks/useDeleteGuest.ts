import { useState, useContext } from "react";
import { deleteGuest } from "../api/guests.api";
import { GuestsContext } from "../context/GuestsContext";

export const useDeleteGuest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const guestsContext = useContext(GuestsContext);

  const handler = async (id: number) => {
    setLoading(true);
    try {
      const response = await deleteGuest(id);
      if (response.success && response.guest) {
        setError("");
        guestsContext?.setGuestAction({
          actionType: "deleted",
          guestId: response.guest.id,
          guestName: response.guest?.name,
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
