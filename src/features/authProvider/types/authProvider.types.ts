import type { User } from "src/shared/types/common.types";

export type AuthProvider = {
  user: User | null;
  authLoading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
};

export type AuthenticatedAuthProvider = Omit<AuthProvider, "user"> & {
  user: User;
};
