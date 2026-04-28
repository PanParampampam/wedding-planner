import type { CreateUser } from "../types/register.types";
import type { UserResponse } from "src/shared/types/common.types";
import { apiClient } from "src/shared/lib/apiClient";

export const createUser = (user: CreateUser): Promise<UserResponse> => {
  return apiClient<UserResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(user),
  });
};
