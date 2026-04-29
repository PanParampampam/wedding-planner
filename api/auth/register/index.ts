import { prisma } from "../../_lib/prisma.js";
import { Prisma } from "../../../src/generated/prisma/client.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcrypt";
import type { UserResponse } from "../../../src/shared/types/common.types.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { name, email, password, weddingDate } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        weddingDate: new Date(weddingDate),
      },
    });
    const response: UserResponse = {
      success: true,
      message: `User ${newUser.name} has been created. You can now log in.`,
      user: {
        name: newUser.name,
        id: newUser.id,
        email: newUser.email,
        weddingDate: newUser.weddingDate,
      },
    };

    return res.status(201).json(response);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const response: UserResponse = {
        success: false,
        message: "User with this email already exists. Please log in.",
      };

      return res.status(409).json(response);
    }

    console.error(e);

    const response: UserResponse = {
      success: false,
      message: "Something went wrong. Please try again later.",
    };

    return res.status(500).json(response);
  }
}
