export type CurrencyCode = "PLN" | "EUR" | "USD";

export type User = {
  name: string;
  email: string;
  weddingDate: Date;
  budget: number | null;
  currencyCode: CurrencyCode;
};

export type Login = {
  email: string;
  password: string;
};

export type StoreActionTypes = "created" | "deleted" | "updated" | null;

export type GuestInvitationStatus = "not yet invited" | "invited" | "confirmed" | "declined";

// API Response

export type GuestResponse = {
  success: boolean;
  message: string;
  guest?: {
    id: string;
    name: string;
  };
};

export type UserResponse = {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    weddingDate: Date;
    budget: number | null;
    currencyCode: CurrencyCode;
  };
};

export type BudgetEntryResponse = {
  success: boolean;
  message?: string;
  budgetEntry?: {
    id: string;
    name: string;
  };
};

export type BudgetCategoryResponse = {
  success: boolean;
  message?: string;
  budgetCategory?: {
    id: string;
    name: string;
  };
};
