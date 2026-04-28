import { useState } from "react";
import type { User } from "../../shared/types/common.types";
import { AuthContext } from "./context/AuthProvider.context";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
}
