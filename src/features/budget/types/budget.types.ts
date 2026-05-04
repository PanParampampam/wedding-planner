import type { StoreActionTypes } from "src/shared/types/common.types";

export type BudgetEntry = {
  id: string;
  name: string;
  plannedAmount: number;
  actualAmount: number;
  dueDate: string | null;
  paid: boolean;
  categoryId: string;
  userId: string;
  note: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateBudgetEntry = Omit<BudgetEntry, "id" | "userId">;

export type BudgetCategory = {
  id: string;
  name: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BudgetCategoryId = BudgetCategory["id"];
export type BudgetCategoryName = BudgetCategory["name"];

//store

type BudgetStateEntry = {
  entryType: "expense" | "category" | null;
  actionType: StoreActionTypes;
  entryId: string;
  entryName: string;
};

type BudgetStateForm = {
  isOpen: boolean;
  entry: BudgetEntry | null;
};

export type BudgetState = {
  entry: BudgetStateEntry;
  form: BudgetStateForm;
  setEntry: (newEntry: BudgetStateEntry) => void;
  setForm: (form: BudgetStateForm) => void;
};
