import { apiClient } from "../../../shared/lib/apiClient";
import type { BudgetCategoryResponse, BudgetEntryResponse } from "src/shared/types/common.types";
import type {
  BudgetCategory,
  BudgetEntry,
  BudgetCategoryName,
  BudgetCategoryId,
  CreateBudgetEntry,
} from "../types/budget.types";

export const getBudgetList = (): Promise<BudgetEntry[]> => {
  return apiClient<BudgetEntry[]>("/api/budget", { credentials: "include" });
};

export const getBudgetCategories = (): Promise<BudgetCategory[]> => {
  return apiClient<BudgetCategory[]>("/api/budget/category", {
    credentials: "include",
  });
};

export const createBudgetCategory = (
  budgetCategory: BudgetCategoryName,
): Promise<BudgetCategoryResponse> => {
  return apiClient<BudgetCategoryResponse>("/api/budget/category", {
    method: "POST",
    body: JSON.stringify(budgetCategory),
    credentials: "include",
  });
};

export const createBudgetEntry = (budgetEntry: CreateBudgetEntry): Promise<BudgetEntryResponse> => {
  return apiClient<BudgetEntryResponse>("/api/budget", {
    method: "POST",
    body: JSON.stringify(budgetEntry),
    credentials: "include",
  });
};

export const updateBudgetEntry = (budgetEntry: BudgetEntry): Promise<BudgetEntryResponse> => {
  return apiClient<BudgetEntryResponse>("/api/budget", {
    method: "PUT",
    body: JSON.stringify(budgetEntry),
    credentials: "include",
  });
};

export const deleteBudgetEntry = (id: string): Promise<BudgetEntryResponse> => {
  return apiClient<BudgetEntryResponse>("/api/budget", {
    method: "DELETE",
    body: JSON.stringify(id),
    credentials: "include",
  });
};

export const deleteBudgetCategory = (
  budgetCategory: BudgetCategoryId,
): Promise<BudgetCategoryResponse> => {
  return apiClient<BudgetCategoryResponse>("/api/budget/category", {
    method: "DELETE",
    body: JSON.stringify(budgetCategory),
    credentials: "include",
  });
};
