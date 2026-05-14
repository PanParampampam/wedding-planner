import type { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../../_lib/prisma.js";
import { signToken } from "../../../src/backend/shared/auth/jwt.js";
import { setAuthCookie } from "../../../src/backend/shared/auth/cookie.js";
import type { UserResponse } from "../../../src/shared/types/common.types.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<UserResponse | VercelResponse> {
  if (req.method !== "POST") return res.status(405).end();

  const demoEmail = process.env.DEMO_USER_EMAIL;

  if (!demoEmail) {
    return res.status(503).json({
      success: false,
      message: "Demo mode is not configured yet.",
    });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: demoEmail } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Demo account is unavailable.",
      });
    }

    const token = signToken(user.id, { readOnly: true, isDemo: true });
    setAuthCookie(res, token);

    return res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        weddingDate: user.weddingDate,
        budget: user.budget ? Number(user.budget) : null,
        currencyCode: user.currencyCode,
        readOnly: true,
        isDemo: true,
      },
    });
  } catch (e) {
    console.error("Failed to start demo session:", e);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
}
