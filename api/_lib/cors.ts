import type { VercelRequest, VercelResponse } from "@vercel/node";

export function setCorsHeaders(req: VercelRequest, res: VercelResponse) {
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://wedding-planner-4404zm5jx-kubas-projects-640afcef.vercel.app",
  ];

  const origin = req.headers.origin;

  if (
    origin &&
    (allowedOrigins.includes(origin) ||
      (origin.startsWith("https://wedding-planner-") &&
        origin.endsWith(".vercel.app")))
  ) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
}
