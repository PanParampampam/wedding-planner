import type { VercelRequest } from "@vercel/node";
import { verifyToken } from "./jwt";
import { prisma } from "../../../../api/_lib/prisma";

export const getUserFromRequest = async (req: VercelRequest) => {
  const cookie = req.headers.cookie;

  if (!cookie) return null;

  const token = cookie
    .split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];

  if (!token) return null;

  try {
    const decoded = verifyToken(token);

    return await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
  } catch {
    return null;
  }
};
