import { prisma } from "../../../../api/_lib/prisma";
import { Prisma } from "../../../generated/prisma/client";

export const guestRepository = {
  findAll: () => prisma.guest.findMany(),

  create: (data: Prisma.GuestCreateInput) =>
    prisma.guest.create({
      data,
    }),
};
