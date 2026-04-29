import type { Dayjs } from "dayjs";
import type { CurrencyCode } from "src/shared/types/common.types";

export type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  weddingDate: Dayjs | null;
  budget: number;
  currencyCode: CurrencyCode;
};

export type RegisterFormErrors = {
  [K in keyof RegisterForm]?: string;
};

export type CreateUser = {
  name: string;
  email: string;
  password: string;
  weddingDate: string;
  budget: number;
  currencyCode: CurrencyCode;
};
