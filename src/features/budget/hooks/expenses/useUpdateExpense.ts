import { useState } from "react";
import { updateBudgetEntry } from "../../api/budget.api";
import type { BudgetEntry } from "../../types/budget.types";
import { useBudgetStore } from "../../store/budget.store";

export const useUpdateExpense = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const { setEntry } = useBudgetStore();

  const handler = async (budgetEntry: BudgetEntry) => {
    setLoading(true);
    try {
      const response = await updateBudgetEntry(budgetEntry);
      if (response.success && response.budgetEntry) {
        setError("");
        setEntry({
          entryType: "expense",
          actionType: "updated",
          entryId: response.budgetEntry.id,
          entryName: response.budgetEntry.name,
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
