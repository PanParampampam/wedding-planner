import { useState } from "react";
import { deleteBudgetEntry } from "../../api/budget.api";
import { useBudgetStore } from "../../store/budget.store";

export const useDeleteExpense = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const { setEntry } = useBudgetStore();

  const handler = async (id: string) => {
    setLoading(true);
    try {
      const response = await deleteBudgetEntry(id);
      if (response.success && response.budgetEntry) {
        setError("");
        setEntry({
          entryType: "expense",
          actionType: "deleted",
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
