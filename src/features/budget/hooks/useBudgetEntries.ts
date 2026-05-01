import { useContext, useEffect, useState } from "react";
import { BudgetContext } from "../context/BudgetContext";
import { getBudgetList } from "../api/budget.api";
import type { BudgetEntry } from "../types/budget.types";

export const useBudgetEntries = () => {
  const [budgetEntries, setBudgetEntries] = useState<BudgetEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const budgetContext = useContext(BudgetContext);

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
  }, [budgetContext?.budgetAction]);

  return { budgetEntries, loading, error };
};
