import { prisma } from "../_lib/prisma.js";
import { setCorsHeaders } from "../_lib/cors.js";
import { Prisma } from "../../src/generated/prisma/client.js";
import { getUserFromRequest } from "../../src/backend/shared/auth/getUser.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { GuestResponse } from "../../src/shared/types/common.types.js";
import type { UserResponse } from "../../src/shared/types/common.types.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<UserResponse | VercelResponse> {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const user = await getUserFromRequest(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const guests = await prisma.guest.findMany({
        where: { userId: user.id },
      });
      return res.status(200).json(guests);
    } catch (e) {
      console.error("Failed to fetch guests: ", e);

      return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    }
  }

  if (req.method === "POST") {
    try {
      const newGuest = await prisma.$transaction(async (tx) => {
        const createdGuest = await tx.guest.create({
          data: { ...req.body, userId: user.id },
        });

        if (req.body?.plusOneId) {
          const linkedGuestUpdate = await tx.guest.updateMany({
            where: {
              id: req.body.plusOneId,
              userId: user.id,
            },
            data: {
              plusOneId: createdGuest.id,
            },
          });

          if (linkedGuestUpdate.count === 0) {
            throw new Error("Selected plus one guest was not found.");
          }
        }

        return createdGuest;
      });

      const response: GuestResponse = {
        success: true,
        message: "Guest created",
        guest: {
          id: newGuest.id,
          name: `${newGuest.name} ${newGuest.surname}`,
        },
      };

      return res.status(201).json(response);
    } catch (e) {
      if (e instanceof Error && e.message === "Selected plus one guest was not found.") {
        const response: GuestResponse = {
          success: false,
          message: "Selected plus one guest was not found.",
        };

        return res.status(400).json(response);
      }

      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        const response: GuestResponse = {
          success: false,
          message: "Guest with this email and/or phone number already exist",
        };

        return res.status(409).json(response);
      }

      console.error(e);

      const response: GuestResponse = {
        success: false,
        message: "Something went wrong. Please try again later.",
      };

      return res.status(500).json(response);
    }
  }

  if (req.method === "DELETE") {
    try {
      const deletedGuest = await prisma.$transaction(async (tx) => {
        const removedGuest = await tx.guest.delete({
          where: { id: req.body, userId: user.id },
        });

        if (removedGuest.plusOneId) {
          await tx.guest.updateMany({
            where: {
              id: removedGuest.plusOneId,
              userId: user.id,
            },
            data: {
              plusOneId: null,
            },
          });
        }

        return removedGuest;
      });

      const response: GuestResponse = {
        success: true,
        message: "Guest deleted",
        guest: {
          id: deletedGuest.id,
          name: `${deletedGuest.name} ${deletedGuest.surname}`,
        },
      };

      return res.status(200).json(response);
    } catch (e) {
      console.error(e);

      const response: GuestResponse = {
        success: false,
        message: "Something went wrong. Please try again later.",
      };

      return res.status(500).json(response);
    }
  }

  if (req.method === "PUT") {
    try {
      const updatedGuest = await prisma.guest.update({
        where: { id: req.body.id, userId: user.id },
        data: { ...req.body },
      });

      const response: GuestResponse = {
        success: true,
        message: "Guest updated",
        guest: {
          id: updatedGuest.id,
          name: `${updatedGuest.name} ${updatedGuest.surname}`,
        },
      };

      return res.status(200).json(response);
    } catch (e) {
      console.error(e);

      const response: GuestResponse = {
        success: false,
        message: "Something went wrong. Please try again later.",
      };

      return res.status(500).json(response);
    }
  }

  return res.status(405).end();
}
