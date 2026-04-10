import { apiClient } from "../../../shared/lib/apiClient";
import type { Guest } from "../../../generated/prisma/client";

export const getGuests = (): Promise<Guest[]> => {
  return apiClient<Guest[]>("/api/guests");
};

export const createGuest = (data: Guest) => {
  return apiClient("/api/guests", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
