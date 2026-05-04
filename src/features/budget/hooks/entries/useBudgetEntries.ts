import { useEffect, useState } from "react";
import { getBudgetList } from "../../api/budget.api";
import type { BudgetEntry } from "../../types/budget.types";
import { useBudgetStore } from "../../store/budget.store";

export const useBudgetEntries = () => {
  const [budgetEntries, setBudgetEntries] = useState<BudgetEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { entry } = useBudgetStore();

  useEffect(() => {
    setLoading(true);

    const getBudgetEntriesHandler = async () => {
      try {
        const budgetEntriesResponse = await getBudgetList();
        setBudgetEntries(budgetEntriesResponse);
      } catch (e) {
        console.error("getBudgetEntriesHandler error:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getBudgetEntriesHandler();
  }, [entry.entryId]);

  return { budgetEntries, loading, error };
};
