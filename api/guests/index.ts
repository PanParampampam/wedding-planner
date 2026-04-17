import { prisma } from "../_lib/prisma.js";
import { setCorsHeaders } from "../_lib/cors.js";
import { Prisma } from "../../src/generated/prisma/client.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export type guestResponse = {
  success: boolean;
  message: string;
  guest?: {
    id: number;
    name: string;
  };
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers for all responses
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  // res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method === "GET") {
    try {
      const guests = await prisma.guest.findMany();
      return res.status(200).json(guests);
    } catch (e) {
      console.error("Failed to fetch guests", e);

      return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    }
  }

  if (req.method === "POST") {
    try {
      const newGuest = await prisma.guest.create({
        data: req.body,
      });

      const response: guestResponse = {
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
        const response: guestResponse = {
          success: false,
          message: "Guest with this email and/or phone number already exist",
        };

        return res.status(409).json(response);
      }

      console.error(e);

      const response: guestResponse = {
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

      const response: guestResponse = {
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

      const response: guestResponse = {
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

      const response: guestResponse = {
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

      const response: guestResponse = {
        success: false,
        message: "Something went wrong. Please try again later.",
      };

      return res.status(500).json(response);
    }
  }

  return res.status(405).end();
}
