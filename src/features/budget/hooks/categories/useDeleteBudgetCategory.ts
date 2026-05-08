import { useState } from "react";
import { deleteBudgetCategory } from "../../api/budget.api";
import type { BudgetCategoryId } from "../../types/budget.types";
import { useBudgetStore } from "../../store/budget.store";

export const useDeleteBudgetCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const { setEntry } = useBudgetStore();

  const handler = async (categoryId: BudgetCategoryId) => {
    setLoading(true);
    try {
      const response = await deleteBudgetCategory(categoryId);
      if (response.success && response.budgetCategory) {
        setError("");
        setEntry({
          entryType: "category",
          actionType: "deleted",
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
