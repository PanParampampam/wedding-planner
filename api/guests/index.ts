import { prisma } from "../_lib/prisma";

export default async function handler(req, res) {
  // Set CORS headers for all responses
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method === "GET") {
    const guests = await prisma.guest.findMany();
    return res.status(200).json(guests);
  }

  if (req.method === "POST") {
    const guest = await prisma.guest.create({
      data: req.body,
    });
    return res.status(201).json(guest);
  }

  return res.status(405).end();
}
