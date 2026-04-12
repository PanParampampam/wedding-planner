import { prisma } from "../_lib/prisma.js";
import { setCorsHeaders } from "../_lib/cors.js";

export type createGuestResponse = {
  success: boolean;
  message: string;
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
      response = res.status().json({
        success: false,
        message: "The guest has not been created: ",
        e,
      });
      return response;
    }
  }

  return res.status(405).end();
}
