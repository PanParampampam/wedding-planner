import { useContext, useState } from "react";
import { createBudgetCategory } from "../api/budget.api";
import { BudgetContext } from "../context/BudgetContext";
import type { CreateBudgetCategory } from "../types/budget.types";

export const useCreateBudgetCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const budgetContext = useContext(BudgetContext);

  const handler = async (budgetCategory: CreateBudgetCategory) => {
    setLoading(true);
    try {
      const response = await createBudgetCategory(budgetCategory);
      if (response.success && response.budgetCategory) {
        setError("");
        budgetContext?.setBudgetAction({
          actionType: "createdCategory",
          entryName: response.budgetCategory.name,
        });
        console.log(budgetContext?.budgetAction);
        return true;
      }

      throw new Error(response.message);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handler, loading, error };
};
