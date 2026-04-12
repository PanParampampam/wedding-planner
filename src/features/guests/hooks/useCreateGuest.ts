import { useState } from "react";
import type { Guest } from "../../../generated/prisma/client";
import { createGuest } from "../api/guests.api";
import { v4 as uuidv4 } from "uuid";

export const useCreateGuest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handler = async (guest: Guest) => {
    setLoading(true);
    const newGuest: Guest = { ...guest, id: uuidv4() };
    const response = await createGuest(newGuest);
    console.log(response);
    if (response.success) {
      setSuccess(response.success);
    } else {
      setSuccess(response.success);
      setError(response.message);
    }
    setLoading(false);
  };

  return { handler, loading, error, success };
};
