import { prisma } from "../../../../api/_lib/prisma";

export const guestRepository = {
  findAll: () => prisma.guest.findMany(),

  create: (data) =>
    prisma.guest.create({
      data,
    }),
};
