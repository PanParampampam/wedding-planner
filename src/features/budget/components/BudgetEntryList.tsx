import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";

import { Alert, Paper, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useBudgetEntries } from "../hooks/useBudgetEntries";
import type { BudgetCategory, BudgetEntry } from "../types/budget.types";
import BudgetSummary from "./BudgetSummary";
import { useAuthProvider } from "src/features/authProvider/hooks/useAuthProvider";

import { daysUntil } from "../utils/budget.utils";
import BudgetEntryItem from "./BudgetEntryItem";
import type { User } from "src/shared/types/common.types";
import { formatDate } from "src/shared/utils/formatDate";
import BudgetCategories from "./BudgetCategories";

type BudgetEntryListProps = {
  openEditBudgetForm: (budgetEntry: BudgetEntry) => void;
  categories: BudgetCategory[];
};

export default function BudgetEntryList({ openEditBudgetForm, categories }: BudgetEntryListProps) {
  const { budgetEntries, loading, error } = useBudgetEntries();
  const { user } = useAuthProvider() as { user: User };

  const sortedEntries = useMemo(
    () =>
      [...budgetEntries].sort((a, b) => {
        if (a.paid !== b.paid) return a.paid ? 1 : -1;
        const da = daysUntil(a.dueDate);
        const db = daysUntil(b.dueDate);
        if (da === null && db === null) return 0;
        if (da === null) return 1;
        if (db === null) return -1;
        return da - db;
      }),
    [budgetEntries],
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
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography sx={{ color: "text.secondary" }}>Loading budget entries...</Typography>
      </Paper>
    );
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
        currencyCode={user.currencyCode}
        nearestDeadline={nearestDeadline}
      />

      <BudgetCategories categories={categories} />

      <Stack spacing={2}>
        <Typography variant="h2" sx={{ color: "primary.main", fontWeight: 700 }}>
          Expenses
        </Typography>
        <Typography sx={{ mt: 1, color: "text.secondary", maxWidth: 800 }}>
          Unpaid entries appear first, ordered by due date
        </Typography>
        {sortedEntries.length > 0 ? (
          sortedEntries.map((entry) => {
            return (
              <BudgetEntryItem
                key={entry.id}
                entry={entry}
                categories={categories}
                currencyCode={user?.currencyCode}
                openEditBudgetForm={openEditBudgetForm}
              />
            );
          })
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              border: "1px dashed",
              borderColor: "divider",
              backgroundColor: "background.paper",
            }}
          >
            <Stack spacing={1.5} sx={{ alignItems: "flex-start" }}>
              <ReceiptLongRoundedIcon color="primary" />
              <Typography variant="h6">No budget entries yet</Typography>
              <Typography sx={{ color: "text.secondary", maxWidth: 800 }}>
                Start with the biggest costs first, then add the smaller details as they come in.
              </Typography>
            </Stack>
          </Paper>
        )}
      </Stack>
    </>
  );
}
