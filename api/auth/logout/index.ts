import type { VercelRequest, VercelResponse } from "@vercel/node";
import { clearAuthCookie } from "../../../src/backend/shared/auth/cookie.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<VercelResponse> {
  if (req.method !== "POST") return res.status(405).end();

  clearAuthCookie(res);
  return res.status(200).json({ success: true });
}
