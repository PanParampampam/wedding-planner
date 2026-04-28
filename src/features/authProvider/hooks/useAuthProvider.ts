import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider.context";
import type { AuthProvider } from "../types/authProvider.types";

export const useAuthProvider = (): AuthProvider => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthProvider must be used within an AuthProvider");
  }

  return context;
};
