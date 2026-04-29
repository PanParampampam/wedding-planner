import { prisma } from "../../../../api/_lib/prisma.js";
import { Prisma } from "../../../generated/prisma/client.js";

export const guestRepository = {
  findAll: () => prisma.guest.findMany(),

  create: (data: Prisma.GuestCreateInput) =>
    prisma.guest.create({
      data,
    }),

  delete: (id: number) => {
    prisma.guest.delete({
      where: {
        id: id,
      },
    });
  },
};
