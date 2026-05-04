import { useState } from "react";
import { createBudgetCategory } from "../../api/budget.api";
import type { BudgetCategoryName } from "../../types/budget.types";
import { useBudgetStore } from "../../store/budget.store";

export const useCreateBudgetCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const { setEntry } = useBudgetStore();

  const handler = async (name: BudgetCategoryName): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await createBudgetCategory(name);
      if (response.success && response.budgetCategory) {
        setError("");
        setEntry({
          entryType: "category",
          actionType: "created",
          entryId: response.budgetCategory.id,
          entryName: response.budgetCategory.name,
        });
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
