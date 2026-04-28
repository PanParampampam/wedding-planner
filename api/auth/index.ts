import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getUserFromRequest } from "../../src/backend/shared/auth/getUser";
import type { UserResponse } from "../../src/shared/types/common.types";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<UserResponse | VercelResponse> {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ success: false });
    }
    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    console.error("Failed to authenticate user: ", e);
    return res.status(500).json({ success: false });
  }
}
