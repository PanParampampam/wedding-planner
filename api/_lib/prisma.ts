import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../src/generated/prisma/client.js";

const connectionString =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.PRISMA_DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "Missing database connection string. Set DATABASE_URL, POSTGRES_URL, or PRISMA_DATABASE_URL.",
  );
}

const globalForPrisma = globalThis as typeof globalThis & {
  __prisma__?: PrismaClient;
};

const prisma =
  globalForPrisma.__prisma__ ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__prisma__ = prisma;
}

export { prisma };
