import { useState, useEffect } from "react";
import type { User } from "../../shared/types/common.types";
import { AuthContext } from "./context/AuthProvider.context";
import { auth, logoutApi } from "./api/auth.api";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    const handler = async () => {
      try {
        const authUser = await auth();
        if (authUser.user) {
          setUser(authUser.user);
        }
      } catch {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    handler();
  }, []);

  return (
    <AuthContext value={{ user, authLoading, login, logout }}>
      {children}
    </AuthContext>
  );
}
