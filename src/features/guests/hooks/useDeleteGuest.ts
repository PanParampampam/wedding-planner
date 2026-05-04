import { useState } from "react";
import { deleteGuest } from "../api/guests.api";
import { useGuestsStore } from "../store/guests.store";

export const useDeleteGuest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const { setGuest } = useGuestsStore();

  const handler = async (id: string) => {
    setLoading(true);
    try {
      const response = await deleteGuest(id);
      if (response.success && response.guest) {
        setError("");
        setGuest({
          actionType: "deleted",
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
