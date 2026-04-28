import type { User } from "src/shared/types/common.types";

export type AuthProvider = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};
