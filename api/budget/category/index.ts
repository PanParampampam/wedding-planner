import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Prisma } from "../../../src/generated/prisma/client.js";
import { setCorsHeaders } from "../../_lib/cors.js";
import { prisma } from "../../_lib/prisma.js";
import { getUserFromRequest } from "../../../src/backend/shared/auth/getUser.js";
import type { BudgetCategoryResponse } from "src/shared/types/common.types.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<VercelResponse | BudgetCategoryResponse> {
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
      const categories = await prisma.budgetCategory.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "asc" },
      });

      return res.status(200).json(categories);
    } catch (e) {
      console.error("Failed to fetch budget categories:", e);
      return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    }
  }

  if (req.method === "POST") {
    try {
      const newCategory = await prisma.budgetCategory.create({
        data: { ...req.body, userId: user.id },
      });

      return res.status(201).json({
        success: true,
        message: "Budget category created",
        budgetCategory: {
          id: newCategory.id,
          name: newCategory.name,
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        return res.status(409).json({
          success: false,
          message: "You already have this category.",
        });
      }

      console.error("Failed to create budget category:", e);
      return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deletedCategory = await prisma.budgetCategory.delete({
        where: { id: req.body, userId: user.id },
      });

      return res.status(200).json({
        success: true,
        message: "Budget category deleted",
        budgetCategory: {
          id: deletedCategory.id,
          name: deletedCategory.name,
        },
      });
    } catch (e) {
      console.error("Failed to delete budget category:", e);
      return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    }
  }

  if (req.method === "PUT") {
    try {
      const updatedCategory = await prisma.budgetCategory.update({
        where: { id: req.body.id, userId: user.id },
        data: { ...req.body },
      });

      return res.status(200).json({
        success: true,
        message: "Budget category updated",
        budgetCategory: {
          id: updatedCategory,
          name: updatedCategory.name,
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        return res.status(409).json({
          success: false,
          message: "You already have this category.",
        });
      }

      console.error("Failed to update budget category:", e);
      return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    }
  }

  return res.status(405).end();
}
