/* eslint-disable @typescript-eslint/no-explicit-any */
//TODO: FIX THE TYPING
import { prisma } from "../_lib/prisma.js";
import { setCorsHeaders } from "../_lib/cors.js";
import { Prisma } from "../../src/generated/prisma/client.js";

export type createGuestResponse = {
  success: boolean;
  message: string;
};

export default async function handler(req: any, res: any): Promise<unknown> {
  setCorsHeaders(req, res);

  // Handle preflight OPTIONS request
  // if (req.method === "OPTIONS") {
  //   return res.status(204).end();
  // }

  if (req.method === "GET") {
    const guests = await prisma.guest.findMany();
    return res.json(guests);
  }

  if (req.method === "POST") {
    let response: createGuestResponse = { success: false, message: "" };
    try {
      await prisma.guest.create({
        data: req.body,
      });
      response = res
        .status(201)
        .json({ success: true, message: "Guest created" });
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
        response = res.status(500).json({
          success: false,
          message: "Something went wrong. Please try again later.",
        });
      }
      return response;
    }
  }

  return res.status(405).end();
}
