import type { VercelRequest } from "@vercel/node";
import { verifyToken } from "./jwt.js";
import { prisma } from "../../../../api/_lib/prisma.js";
import type { User } from "../../../generated/prisma/client.js";

export const getUserFromRequest = async (
  req: VercelRequest,
): Promise<User | null> => {
  const cookie = req.headers.cookie;
  if (!cookie) return null;

  const tokenCookie = cookie
    .split(";")
    .find((c) => c.trim().startsWith("token="));
  const token = tokenCookie?.trim().slice("token=".length);

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
