import { useContext, useState } from "react";
import { deleteBudgetEntry } from "../api/budget.api";
import { BudgetContext } from "../context/BudgetContext";

export const useDeleteBudgetEntry = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const budgetContext = useContext(BudgetContext);

  const handler = async (id: string) => {
    setLoading(true);
    try {
      const response = await deleteBudgetEntry(id);
      if (response.success && response.budgetEntry) {
        setError("");
        budgetContext?.setBudgetAction({
          actionType: "deleted",
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
