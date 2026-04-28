import { useState } from "react";
import type { User } from "../../../shared/types/common.types";
import type { AuthProvider } from "../types/authProvider.types";

export const useAuthProvider = (): AuthProvider => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };
  return { user, login, logout };
};
