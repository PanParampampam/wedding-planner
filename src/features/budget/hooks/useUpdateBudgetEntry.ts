import { useContext, useState } from "react";
import { updateBudgetEntry } from "../api/budget.api";
import { BudgetContext } from "../context/BudgetContext";
import type { BudgetEntry } from "../types/budget.types";

export const useUpdateBudgetEntry = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const budgetContext = useContext(BudgetContext);

  const handler = async (budgetEntry: BudgetEntry) => {
    setLoading(true);
    try {
      const response = await updateBudgetEntry(budgetEntry);
      if (response.success && response.budgetEntry) {
        setError("");
        budgetContext?.setBudgetAction({
          actionType: "updated",
          budgetEntryId: response.budgetEntry.id,
          budgetEntryName: response.budgetEntry.name,
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
