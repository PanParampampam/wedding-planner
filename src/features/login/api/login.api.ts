import { apiClient } from "src/shared/lib/apiClient";
import type { Login, UserResponse } from "src/shared/types/common.types";

export const login = (user: Login): Promise<UserResponse> => {
  return apiClient<UserResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(user),
  });
};
