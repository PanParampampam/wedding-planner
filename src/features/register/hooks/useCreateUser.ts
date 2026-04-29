import { useState } from "react";
import { createUser } from "../api/register.api";
import type { CreateUser } from "../types/register.types";

export const useCreateUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");

  const handler = async (user: CreateUser): Promise<boolean> => {
    setLoading(true);
    try {
      const newUser: CreateUser = {
        name: user.name,
        email: user.email,
        password: user.password,
        weddingDate: user.weddingDate,
        budget: user.budget,
        currencyCode: user.currencyCode,
      };
      const response = await createUser(newUser);
      if (response.success && response.user) {
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
