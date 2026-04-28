import { createContext } from "react";
import type { AuthProvider } from "../types/authProvider.types";

export const AuthContext = createContext<AuthProvider | undefined>(undefined);
