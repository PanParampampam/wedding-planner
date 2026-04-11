import { useState } from "react";
import type { Guest } from "@prisma/client";

export const useCreateGuest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handler = async (guest: Guest) => {
    console.log(guest);
  };

  return { handler, loading, error };
};
