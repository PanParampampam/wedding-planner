import type { User as PrismaUser } from "src/generated/prisma/client";

export type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type CreateUser = Omit<PrismaUser, "id">;
