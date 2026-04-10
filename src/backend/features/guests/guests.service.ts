import { guestRepository } from "./guests.repository";
import { Prisma } from "../../../generated/prisma/client";

export const getGuests = async () => {
  return guestRepository.findAll();
};

export const createGuest = async (data: Prisma.GuestCreateInput) => {
  return guestRepository.create(data);
};
