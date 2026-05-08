import { Alert } from "@mui/material";
import { useMemo, useState } from "react";
import { useFetchExpenses } from "../hooks/expenses/useFetchExpenses";
import type { BudgetCategory } from "../types/budget.types";
import BudgetSummary from "./budgetSummary/BudgetSummary";
import { useAuthProvider } from "src/features/authProvider/hooks/useAuthProvider";
import { daysUntil } from "../utils/budget.utils";
import type { User } from "src/shared/types/common.types";
import { formatDate } from "src/shared/utils/formatDate";
import BudgetCategories from "./budgetCategories/BudgetCategories";
import BudgetEntryListSkeleton from "./BudgetDashboardSkeleton";
import BudgetEntryList from "./budgetEntryList/BudgetEntryList";

type BudgetEntryListProps = {
  categories: BudgetCategory[];
};

export default function BudgetDashboard({ categories }: BudgetEntryListProps) {
  const { budgetEntries, loading, error } = useFetchExpenses();
  const { user } = useAuthProvider() as { user: User };
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

  const filteredEntries =
    categoryFilter.length !== 0
      ? budgetEntries.filter((entry) => categoryFilter.includes(entry.categoryId))
      : budgetEntries;

  const sortedEntries = useMemo(
    () =>
      [...filteredEntries].sort((a, b) => {
        if (a.paid !== b.paid) return a.paid ? 1 : -1;
        const da = daysUntil(a.dueDate);
        const db = daysUntil(b.dueDate);
        if (da === null && db === null) return 0;
        if (da === null) return 1;
        if (db === null) return -1;
        return da - db;
      }),
    [filteredEntries],
  );

  const plannedExpenses = budgetEntries.reduce(
    (sum, entry) => sum + Number(entry.plannedAmount ?? 0),
    0,
  );

  const plannedItemsCount = budgetEntries.filter(
    (entry) => Number(entry.plannedAmount ?? 0) > 0,
  ).length;

  const actualExpenses = budgetEntries.reduce(
    (sum, entry) => sum + Number(entry.actualAmount ?? 0),
    0,
  );

  const actualItemsCount = budgetEntries.filter(
    (entry) => Number(entry.actualAmount ?? 0) > 0,
  ).length;

  const nearestDeadline = useMemo(() => {
    const open = budgetEntries.filter((e) => !e.paid && e.dueDate !== null);
    if (open.length === 0) return null;
    open.sort((a, b) => {
      const da = daysUntil(a.dueDate);
      const db = daysUntil(b.dueDate);
      if (da === null) return 1;
      if (db === null) return -1;
      return da - db;
    });
    const nearest = open[0];
    return {
      days: daysUntil(nearest.dueDate)!,
      date: formatDate(nearest.dueDate),
      name: nearest.name,
    };
  }, [budgetEntries]);

  if (loading) {
    return <BudgetEntryListSkeleton />;
  }

  if (error) {
    return <Alert severity="error">Failed to load budget entries.</Alert>;
  }

  return (
    <>
      <BudgetSummary
        budget={user.budget}
        plannedExpenses={plannedExpenses}
        plannedItemsCount={plannedItemsCount}
        actualExpenses={actualExpenses}
        actualItemsCount={actualItemsCount}
        totalExpensesCount={budgetEntries.length}
        currencyCode={user.currencyCode}
        nearestDeadline={nearestDeadline}
      />

      <BudgetCategories
        categories={categories}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      <BudgetEntryList
        entries={sortedEntries}
        categories={categories}
        currencyCode={user.currencyCode}
      />
    </>
  );
}
