import type { Dayjs } from "dayjs";

export type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  weddingDate: Dayjs | null;
};

export type RegisterFormErrors = {
  [K in keyof RegisterForm]?: string;
};

export type CreateUser = {
  name: string;
  email: string;
  password: string;
  weddingDate: string;
};
