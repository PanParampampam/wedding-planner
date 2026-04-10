export function setCorsHeaders(req, res) {
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://wedding-planner-4404zm5jx-kubas-projects-640afcef.vercel.app",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}
