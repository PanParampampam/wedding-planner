import { useEffect, useState } from "react";
import { getBudgetCategories } from "../api/budget.api";
import type { BudgetCategory } from "../types/budget.types";

export const useBudgetCategories = () => {
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
  }, []);

  return { categories, loading, error };
};
