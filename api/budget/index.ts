import { prisma } from "../_lib/prisma.js";
import { Prisma } from "../../src/generated/prisma/client.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getUserFromRequest } from "./../../src/backend/shared/auth/getUser.js";
import type { BudgetEntryResponse } from "./../../src/shared/types/common.types.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<VercelResponse | BudgetEntryResponse> {
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const user = await getUserFromRequest(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const budgetList = await prisma.budgetEntry.findMany({
        where: { userId: user.id },
      });
      return res.status(200).json(budgetList);
    } catch (e) {
      console.error("Failed to fetch budget list: ", e);
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }

  if (req.method === "POST") {
    try {
      const newBudgetEntry = await prisma.budgetEntry.create({
        data: { ...req.body, userId: user.id },
      });

      const response: BudgetEntryResponse = {
        success: true,
        message: "Guest created",
        budgetEntry: {
          id: newBudgetEntry.id,
          name: newBudgetEntry.name,
        },
      };

      return res.status(201).json(response);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        const response: BudgetEntryResponse = {
          success: false,
          message: "You've already created that expense.",
        };

        return res.status(409).json(response);
      }
    }
  }

  if (req.method === "DELETE") {
    try {
      const deletedBudgetEntry = await prisma.budgetEntry.delete({
        where: { id: req.body },
      });

      const response: BudgetEntryResponse = {
        success: true,
        message: "Guest deleted",
        budgetEntry: {
          id: deletedBudgetEntry.id,
          name: deletedBudgetEntry.name,
        },
      };

      return res.status(200).json(response);
    } catch (e) {
      console.error(e);

      const response: BudgetEntryResponse = {
        success: false,
        message: "Something went wrong. Please try again later.",
      };

      return res.status(500).json(response);
    }
  }

  if (req.method === "PUT") {
    try {
      const updateBudgetEntry = await prisma.budgetEntry.update({
        where: { id: req.body.id },
        data: { ...req.body },
      });

      const response: BudgetEntryResponse = {
        success: true,
        message: "Guest updated",
        budgetEntry: {
          id: updateBudgetEntry.id,
          name: updateBudgetEntry.name,
        },
      };

      return res.status(200).json(response);
    } catch (e) {
      console.error(e);

      const response: BudgetEntryResponse = {
        success: false,
        message: "Something went wrong. Please try again later.",
      };

      return res.status(500).json(response);
    }
  }

  return res.status(405).end();
}
