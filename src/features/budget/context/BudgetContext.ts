import { createContext } from "react";
import type { BudgetAction } from "../types/budget.types";

export type BudgetActionContextType = {
  budgetAction?: BudgetAction;
  setBudgetAction: React.Dispatch<
    React.SetStateAction<BudgetAction | undefined>
  >;
};

export const BudgetContext = createContext<BudgetActionContextType | null>(
  null,
);
