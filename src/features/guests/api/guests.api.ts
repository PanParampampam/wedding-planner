import { apiClient } from "../../../shared/lib/apiClient";

export const getGuests = () => {
  return apiClient("/api/guests");
};

export const createGuest = (data: any) => {
  return apiClient("/api/guests", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
