import { useEffect, useState } from "react";
import { getBudgetList } from "../../api/budget.api";
import type { BudgetEntry } from "../../types/budget.types";
import { useBudgetStore } from "../../store/budget.store";

export const useFetchExpenses = () => {
  const [budgetEntries, setBudgetEntries] = useState<BudgetEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { entry } = useBudgetStore();

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const budgetEntriesResponse = await getBudgetList();
      setBudgetEntries(budgetEntriesResponse);
    } catch (e) {
      console.error("fetchExpenses error:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (!entry.entryId) return;
    fetchExpenses();
  }, [entry.entryId]);

  return { budgetEntries, loading, error };
};
