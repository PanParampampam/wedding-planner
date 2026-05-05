import { prisma } from "../_lib/prisma.js";
import { setCorsHeaders } from "../_lib/cors.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getUserFromRequest } from "../../src/backend/shared/auth/getUser.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<VercelResponse> {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const user = await getUserFromRequest(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const [guestsOverview, budgetEntriesAggregate, totalExpensesCount, nearestDeadlineEntry] =
        await Promise.all([
          prisma.guest.findMany({
            where: { userId: user.id },
            select: {
              status: true,
              children: true,
            },
          }),
          prisma.budgetEntry.aggregate({
            where: { userId: user.id },
            _sum: {
              plannedAmount: true,
              actualAmount: true,
            },
          }),
          prisma.budgetEntry.count({
            where: { userId: user.id },
          }),
          prisma.budgetEntry.findFirst({
            where: {
              userId: user.id,
              paid: false,
              dueDate: {
                not: null,
              },
            },
            orderBy: {
              dueDate: "asc",
            },
            select: {
              id: true,
              name: true,
              dueDate: true,
            },
          }),
        ]);

      return res.status(200).json({
        guestsOverview,
        budgetOverview: {
          budget: user.budget ? Number(user.budget) : null,
          plannedExpenses: Number(budgetEntriesAggregate._sum.plannedAmount ?? 0),
          actualExpenses: Number(budgetEntriesAggregate._sum.actualAmount ?? 0),
          totalExpensesCount,
          nearestDeadlineEntry,
        },
      });
    } catch (e) {
      console.error("Failed to fetch home dashboard data: ", e);

      return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    }
  }

  return res.status(405).end();
}
