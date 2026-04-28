import { useState } from "react";
import { login } from "../api/login.api";
import type { Login } from "src/shared/types/common.types";
import type { User } from "src/shared/types/common.types";

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");

  const handler = async (user: Login): Promise<User | null> => {
    setLoading(true);
    try {
      const response = await login(user);
      if (response.success && response.user) {
        setError("");
        return {
          name: response.user.name,
          email: response.user.email,
        };
      } else {
        throw new Error(response.message);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handler, loading, error };
};
