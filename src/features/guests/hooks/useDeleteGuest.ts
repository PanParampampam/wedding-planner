import { useState } from "react";
import { deleteGuest } from "../api/guests.api";

export const useDeleteGuest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");

  const handler = async (id: number) => {
    setLoading(true);
    try {
      const response = await deleteGuest(id);
      console.log(response);
      if (response.success) {
        setError("");
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
