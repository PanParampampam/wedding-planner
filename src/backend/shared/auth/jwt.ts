import jwt from "jsonwebtoken";

type TokenPayload = {
  userId: string;
  readOnly?: boolean;
  isDemo?: boolean;
};

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Missing JWT_SECRET environment variable");
  }

  return secret;
};

export const signToken = (userId: string, options?: { readOnly?: boolean; isDemo?: boolean }) => {
  const payload: TokenPayload = {
    userId,
    readOnly: Boolean(options?.readOnly),
    isDemo: Boolean(options?.isDemo),
  };

  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, getJwtSecret()) as TokenPayload;
};
