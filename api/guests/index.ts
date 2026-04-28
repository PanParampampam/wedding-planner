import { prisma } from "../_lib/prisma.js";
import { setCorsHeaders } from "../_lib/cors.js";
import { Prisma } from "../../src/generated/prisma/client.js";
import { getUserFromRequest } from "../../src/backend/shared/auth/getUser.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { GuestResponse } from "../../src/backend/features/guests/guests.types.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
      const newGuest = await prisma.guest.create({
        data: { ...req.body, userId: user.id },
      });

      const response: GuestResponse = {
        success: true,
        message: "Guest created",
        guest: {
          id: newGuest.id,
          name: newGuest.name,
        },
      };

      return res.status(201).json(response);
    } catch (e) {
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
      const deletedGuest = await prisma.guest.delete({
        where: { id: req.body },
      });

      const response: GuestResponse = {
        success: true,
        message: "Guest deleted",
        guest: {
          id: deletedGuest.id,
          name: deletedGuest.name,
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
        where: { id: req.body.id },
        data: { ...req.body },
      });

      const response: GuestResponse = {
        success: true,
        message: "Guest updated",
        guest: {
          id: updatedGuest.id,
          name: updatedGuest.name,
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
