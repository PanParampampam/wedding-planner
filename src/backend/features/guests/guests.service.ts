import { guestRepository } from "./guests.repository";

export const getGuests = async () => {
  return guestRepository.findAll();
};

export const createGuest = async (data) => {
  return guestRepository.create(data);
};
