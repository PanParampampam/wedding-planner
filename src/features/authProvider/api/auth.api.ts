import { apiClient } from "src/shared/lib/apiClient";
import type { UserResponse } from "src/shared/types/common.types";

export const auth = (): Promise<UserResponse> => {
  return apiClient<UserResponse>("/api/auth", { credentials: "include" });
};

export const logoutApi = (): Promise<{ success: boolean }> => {
  return apiClient<{ success: boolean }>("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};
