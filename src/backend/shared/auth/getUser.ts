import type { VercelRequest } from "@vercel/node";
import { verifyToken } from "./jwt.js";
import { prisma } from "../../../../api/_lib/prisma.js";
import type { User } from "../../../generated/prisma/client.js";

export type RequestAuthContext = {
  user: User;
  readOnly: boolean;
  isDemo: boolean;
};

export const getAuthContextFromRequest = async (
  req: VercelRequest,
): Promise<RequestAuthContext | null> => {
  const cookie = req.headers.cookie;
  if (!cookie) return null;

  const tokenCookie = cookie.split(";").find((c) => c.trim().startsWith("token="));
  const token = tokenCookie?.trim().slice("token=".length);

  if (!token) return null;

  try {
    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) return null;

    return {
      user,
      readOnly: Boolean(decoded.readOnly),
      isDemo: Boolean(decoded.isDemo),
    };
  } catch {
    return null;
  }
};

export const getUserFromRequest = async (req: VercelRequest): Promise<User | null> => {
  const authContext = await getAuthContextFromRequest(req);
  return authContext?.user ?? null;
};
