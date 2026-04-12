import { apiClient } from "../../../shared/lib/apiClient";
import type { Guest } from "../../../generated/prisma/client";
import type { createGuestResponse } from "../../../../api/guests";

export const getGuests = (): Promise<Guest[]> => {
  return apiClient<Guest[]>("/api/guests");
};

export const createGuest = (data: Guest): Promise<createGuestResponse> => {
  return apiClient<createGuestResponse>("/api/guests", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
