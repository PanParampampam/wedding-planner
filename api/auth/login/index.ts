import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcrypt";
import { prisma } from "../../_lib/prisma.js";
import { signToken } from "../../../src/backend/shared/auth/jwt.js";
import { setAuthCookie } from "../../../src/backend/shared/auth/cookie.js";
import type { UserResponse } from "../../../src/shared/types/common.types.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<UserResponse | VercelResponse> {
  if (req.method !== "POST") return res.status(405).end();
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = signToken(user.id);
    setAuthCookie(res, token);

    return res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        weddingDate: user.weddingDate,
      },
    });
  } catch (e) {
    console.error("Failed to login: ", e);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
}
