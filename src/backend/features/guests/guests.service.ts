import { guestRepository } from "./guests.repository";
import { Prisma } from "src/generated/prisma/client";

export const getGuests = async () => {
  return guestRepository.findAll();
};

export const createGuest = async (data: Prisma.GuestCreateInput) => {
  return guestRepository.create(data);
};

export const deleteGuest = async (id: number) => {
  return guestRepository.delete(id);
};
