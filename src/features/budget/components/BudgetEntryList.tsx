import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useDeleteBudgetEntry } from "../hooks/useDeleteBudgetEntry";
import { useBudgetEntries } from "../hooks/useBudgetEntries";
import { useBudgetCategories } from "../hooks/useBudgetCategories";
import type { BudgetEntry } from "../types/budget.types";
import BudgetSummary from "./BudgetSummary";
import { useAuthProvider } from "src/features/authProvider/hooks/useAuthProvider";
import { formatMoney } from "src/shared/utils/formatMoney";
import { daysUntil, deadlineColor, deadlineLabel } from "../utils/budget.utils";

const formatDate = (value: string | null) => {
  if (!value) return "No deadline";
  return new Date(value).toLocaleDateString("en-GB");
};

export default function BudgetEntryList({
  openEditBudgetForm,
}: {
  openEditBudgetForm: (budgetEntry: BudgetEntry) => void;
}) {
  const { budgetEntries, loading, error } = useBudgetEntries();
  const { categories } = useBudgetCategories();
  const deleteBudgetEntryHook = useDeleteBudgetEntry();
  const { user } = useAuthProvider();

  const categoryById = useMemo(
    () => new Map(categories.map((category) => [category.id, category.name])),
    [categories],
  );

  const sortedEntries = useMemo(
    () =>
      [...budgetEntries].sort((a, b) => {
        // paid entries always go last
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

  const plannedTotal = budgetEntries.reduce(
    (sum, entry) => sum + Number(entry.plannedAmount ?? 0),
    0,
  );
  const plannedItemsCount = budgetEntries.filter(
    (entry) => Number(entry.plannedAmount ?? 0) > 0,
  ).length;
  const actualTotal = budgetEntries.reduce(
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
        <Typography sx={{ color: "text.secondary" }}>
          Loading budget entries...
        </Typography>
      </Paper>
    );
  }

  if (error) {
    return <Alert severity="error">Failed to load budget entries.</Alert>;
  }

  return (
    <>
      <BudgetSummary
        budget={user?.budget ?? null}
        plannedExpenses={plannedTotal}
        plannedItemsCount={plannedItemsCount}
        actualExpenses={actualTotal}
        actualItemsCount={actualItemsCount}
        currencyCode={user?.currencyCode}
        nearestDeadline={nearestDeadline}
      />

      {deleteBudgetEntryHook.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {deleteBudgetEntryHook.error}
        </Alert>
      )}

      <Stack spacing={2}>
        <Typography
          variant="h2"
          sx={{ color: "primary.main", fontWeight: 700 }}
        >
          Expenses
        </Typography>
        <Typography sx={{ mt: 1, color: "text.secondary", maxWidth: 800 }}>
          Unpaid entries appear first, ordered by due date
        </Typography>
        {sortedEntries.length > 0 ? (
          sortedEntries.map((entry) => {
            return (
              <Paper
                key={entry.id}
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(250,247,247,0.94) 100%)",
                }}
              >
                <Box sx={{ p: 2.5 }}>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Stack spacing={1.25} sx={{ minWidth: 0 }}>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
                      >
                        <Typography variant="h6" sx={{ color: "text.primary" }}>
                          {entry.name}
                        </Typography>
                        <Chip
                          size="small"
                          label={
                            categoryById.get(entry.categoryId) ??
                            "Uncategorized"
                          }
                          sx={{
                            backgroundColor: "secondary.light",
                            color: "text.primary",
                          }}
                        />
                        <Chip
                          size="small"
                          icon={
                            entry.paid ? (
                              <CheckCircleRoundedIcon />
                            ) : (
                              <PendingActionsRoundedIcon />
                            )
                          }
                          label={entry.paid ? "Paid" : "Open"}
                          color={entry.paid ? "success" : "default"}
                          variant={entry.paid ? "filled" : "outlined"}
                        />
                      </Stack>

                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2.5}
                      >
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            Planned
                          </Typography>
                          <Typography
                            sx={{ color: "text.primary", fontWeight: 600 }}
                          >
                            {formatMoney(
                              entry.plannedAmount,
                              user?.currencyCode,
                            )}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            Actual
                          </Typography>
                          <Typography
                            sx={{ color: "text.primary", fontWeight: 600 }}
                          >
                            {formatMoney(
                              entry.actualAmount,
                              user?.currencyCode,
                            )}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            Deadline
                          </Typography>
                          {entry.paid ? (
                            <Typography
                              sx={{ color: "text.secondary", fontWeight: 600 }}
                            >
                              {formatDate(entry.dueDate)}
                            </Typography>
                          ) : (
                            <>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  color: deadlineColor(
                                    daysUntil(entry.dueDate),
                                  ),
                                }}
                              >
                                {deadlineLabel(daysUntil(entry.dueDate))}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "text.secondary",
                                  display: "block",
                                }}
                              >
                                {formatDate(entry.dueDate)}
                              </Typography>
                            </>
                          )}
                        </Box>
                      </Stack>

                      {entry.note && (
                        <Typography
                          sx={{ color: "text.secondary", maxWidth: 720 }}
                        >
                          {entry.note}
                        </Typography>
                      )}
                    </Stack>

                    <Stack direction={{ xs: "row", md: "column" }} spacing={1}>
                      <Button
                        variant="outlined"
                        startIcon={<EditRoundedIcon />}
                        onClick={() => openEditBudgetForm(entry)}
                      >
                        Edit
                      </Button>
                      <Button
                        color="error"
                        variant="text"
                        startIcon={<DeleteOutlineRoundedIcon />}
                        onClick={() =>
                          void deleteBudgetEntryHook.handler(entry.id)
                        }
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
                <Divider />
              </Paper>
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
              <Typography sx={{ color: "text.secondary", maxWidth: 540 }}>
                Start with the biggest costs first, then add the smaller details
                as they come in.
              </Typography>
            </Stack>
          </Paper>
        )}
      </Stack>
    </>
  );
}
