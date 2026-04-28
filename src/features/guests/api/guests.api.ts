import { apiClient } from "../../../shared/lib/apiClient";
import type { Guest } from "../../../generated/prisma/client";
import type { GuestResponse } from "src/backend/features/guests/guests.types";
import type { CreateGuest } from "../types/guest.types";

export const getGuests = (): Promise<Guest[]> => {
  return apiClient<Guest[]>("/api/guests", { credentials: "include" });
};

export const createGuest = (data: CreateGuest): Promise<GuestResponse> => {
  return apiClient<GuestResponse>("/api/guests", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export const updateGuest = (guest: Guest): Promise<GuestResponse> => {
  return apiClient<GuestResponse>("/api/guests", {
    method: "PUT",
    body: JSON.stringify(guest),
    credentials: "include",
  });
};

export const deleteGuest = (id: number): Promise<GuestResponse> => {
  return apiClient<GuestResponse>("/api/guests", {
    method: "DELETE",
    body: JSON.stringify(id),
    credentials: "include",
  });
};
