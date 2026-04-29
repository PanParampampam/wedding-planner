import jwt from "jsonwebtoken";

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Missing JWT_SECRET environment variable");
  }

  return secret;
};

export const signToken = (userId: string) => {
  return jwt.sign({ userId }, getJwtSecret(), { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, getJwtSecret()) as { userId: string };
};
