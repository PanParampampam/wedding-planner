import { useState } from "react";
import { createBudgetEntry } from "../../api/budget.api";
import type { CreateBudgetEntry } from "../../types/budget.types";
import { useBudgetStore } from "../../store/budget.store";

export const useCreateExpense = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const { setEntry } = useBudgetStore();

  const handler = async (budgetEntry: CreateBudgetEntry) => {
    setLoading(true);
    try {
      const response = await createBudgetEntry(budgetEntry);
      if (response.success && response.budgetEntry) {
        setError("");
        setEntry({
          entryType: "expense",
          actionType: "created",
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
