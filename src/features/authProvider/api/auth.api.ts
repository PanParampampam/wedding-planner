import { apiClient } from "src/shared/lib/apiClient";
import type { UserResponse } from "src/shared/types/common.types";

export const auth = async (): Promise<UserResponse> => {
  const response = await fetch("/api/auth", { credentials: "include" });

  // Missing cookie/session is a valid anonymous state on first load.
  if (response.status === 401) {
    return { success: false };
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<UserResponse>;
};

export const logoutApi = (): Promise<{ success: boolean }> => {
  return apiClient<{ success: boolean }>("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};
