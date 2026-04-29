import type { VercelResponse } from "@vercel/node";

export const setAuthCookie = (res: VercelResponse, token: string) => {
  res.setHeader(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; SameSite=Lax; ${
      process.env.NODE_ENV === "production" ? "Secure;" : ""
    }`,
  );
};

export const clearAuthCookie = (res: VercelResponse) => {
  res.setHeader(
    "Set-Cookie",
    `token=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0; ${
      process.env.NODE_ENV === "production" ? "Secure;" : ""
    }`,
  );
};
