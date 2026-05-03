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

export type BudgetCategory = {
  id: string;
  name: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateBudgetEntry = Omit<BudgetEntry, "id" | "userId">;

export type CreateBudgetCategory = string;

export type BudgetAction = {
  actionType: "created" | "deleted" | "updated" | "createdCategory";
  entryName: string;
};
