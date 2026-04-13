import { prisma } from "../_lib/prisma.js";
import { setCorsHeaders } from "../_lib/cors.js";
import { Prisma } from "../../src/generated/prisma/client.js";

export type guestResponse = {
  success: boolean;
  message: string;
  guest?: {
    id: number;
    name: string;
  };
};

export default async function handler(req, res) {
  // Set CORS headers for all responses
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  // res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  setCorsHeaders(req, res);

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method === "GET") {
    const guests = await prisma.guest.findMany();
    return res.status(200).json(guests);
  }

  if (req.method === "POST") {
    let response: guestResponse = { success: false, message: "" };
    try {
      const newGuest = await prisma.guest.create({
        data: req.body,
      });
      response = res.status(201).json({
        success: true,
        message: "Guest created",
        guest: {
          id: newGuest.id,
          name: newGuest.name,
        },
      });
      return response;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        //409 status - conflict
        response = res.status(409).json({
          success: false,
          message: "Guest with this email and/or phone number already exist",
        });
      } else {
        //500 status - internal server error
        console.error(e);
        response = res.status(500).json({
          success: false,
          message: "Something went wrong. Please try again later.",
        });
      }
      return response;
    }
  }

  if (req.method === "DELETE") {
    let response: guestResponse = { success: false, message: "" };
    try {
      const deletedGuest = await prisma.guest.delete({
        where: { id: req.body },
      });
      response = res.status(201).json({
        success: true,
        message: "Guest deleted",
        guest: {
          id: deletedGuest.id,
          name: deletedGuest.name,
        },
      });
      return response;
    } catch (e) {
      console.error(e);
      response = res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
      return response;
    }
  }

  return res.status(405).end();
}
