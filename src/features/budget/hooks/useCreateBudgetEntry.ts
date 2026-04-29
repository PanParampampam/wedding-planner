import { useContext, useState } from "react";
import { createBudgetEntry } from "../api/budget.api";
import { BudgetContext } from "../context/BudgetContext";
import type { CreateBudgetEntry } from "../types/budget.types";

export const useCreateBudgetEntry = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const budgetContext = useContext(BudgetContext);

  const handler = async (budgetEntry: CreateBudgetEntry) => {
    setLoading(true);
    try {
      const response = await createBudgetEntry(budgetEntry);
      if (response.success && response.budgetEntry) {
        setError("");
        budgetContext?.setBudgetAction({
          actionType: "created",
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
