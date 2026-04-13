import { apiClient } from "../../../shared/lib/apiClient";
import type { Guest } from "../../../generated/prisma/client";
import type { guestResponse } from "../../../../api/guests";
import type { CreateGuest } from "../types/guest.types";

export const getGuests = (): Promise<Guest[]> => {
  return apiClient<Guest[]>("/api/guests");
};

export const createGuest = (data: CreateGuest): Promise<guestResponse> => {
  return apiClient<guestResponse>("/api/guests", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const deleteGuest = (id: number): Promise<guestResponse> => {
  return apiClient<guestResponse>("/api/guests", {
    method: "DELETE",
    body: JSON.stringify(id),
  });
};
