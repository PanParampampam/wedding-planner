import { useState } from "react";
import { createGuest } from "../api/guests.api";
import type { CreateGuest } from "../types/guest.types";

export const useCreateGuest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");

  const handler = async (guest: CreateGuest) => {
    setLoading(true);
    try {
      const response = await createGuest(guest);
      console.log(response);
      if (response.success) {
        return true;
      } else {
        throw new Error(response.message);
      }
    } catch (e) {
      setLoading(false);
      setError(e instanceof Error ? e.message : String(e));
      return false;
    }
  };

  return { handler, loading, error };
};
