import { apiClient } from "../../../shared/lib/apiClient";
import type { Guest } from "../../../generated/prisma/client";
import type { createGuestResponse } from "../../../../api/guests";
import type { CreateGuest } from "../types/guest.types";

export const getGuests = (): Promise<Guest[]> => {
  return apiClient<Guest[]>("/api/guests");
};

export const createGuest = (
  data: CreateGuest,
): Promise<createGuestResponse> => {
  return apiClient<createGuestResponse>("/api/guests", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
