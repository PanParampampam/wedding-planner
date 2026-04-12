import { useState } from "react";
import type { Guest } from "../../../generated/prisma/client";
import { createGuest } from "../api/guests.api";
import { v4 as uuidv4 } from "uuid";

export const useCreateGuest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handler = async (guest: Guest) => {
    setLoading(true);
    const newGuest: Guest = { ...guest, id: uuidv4() };
    const response = await createGuest(newGuest);
    if (response.success) {
      return response.success;
    } else {
      setLoading(false);
      setError(response.message);
      return response.success;
    }
  };

  return { handler, loading, error };
};
