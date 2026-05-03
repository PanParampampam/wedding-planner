import { useEffect, useState, useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";
import { getBudgetCategories } from "../api/budget.api";
import type { BudgetCategory } from "../types/budget.types";

export const useBudgetCategories = () => {
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const budgetContext = useContext(BudgetContext);

  useEffect(() => {
    setLoading(true);

    const getBudgetCategoriesHandler = async () => {
      try {
        const categoriesResponse = await getBudgetCategories();
        setCategories(categoriesResponse);
      } catch (e) {
        console.error("getBudgetCategoriesHandler error:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getBudgetCategoriesHandler();
  }, [budgetContext?.budgetAction]);

  return { categories, loading, error };
};
