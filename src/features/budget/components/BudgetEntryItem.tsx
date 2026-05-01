import type { BudgetCategory, BudgetEntry } from "../types/budget.types";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import { formatMoney } from "src/shared/utils/formatMoney";
import { daysUntil, deadlineColor } from "../utils/budget.utils";
import { Alert, Box, Button, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import type { CurrencyCode } from "src/shared/types/common.types";
import { formatDate } from "src/shared/utils/formatDate";
import { useDeleteBudgetEntry } from "../hooks/useDeleteBudgetEntry";

type BudgetEntryItemProps = {
  entry: BudgetEntry;
  categories: BudgetCategory[];
  currencyCode: CurrencyCode;
  openEditBudgetForm: (budgetEntry: BudgetEntry) => void;
};

export default function BudgetEntryItem({
  entry,
  categories,
  currencyCode,
  openEditBudgetForm,
}: BudgetEntryItemProps) {
  const entryCategory = categories.find((category) => category.id === entry.categoryId);
  const { handler, loading, error } = useDeleteBudgetEntry();
  const remainingDays = daysUntil(entry.dueDate);

  const remainingDaysLabel = (() => {
    if (entry.paid) {
      return "Settled";
    }

    switch (true) {
      case remainingDays === null:
        return "No deadline";
      case remainingDays! < 0:
        return `${Math.abs(remainingDays)}d overdue`;
      case remainingDays === 0:
        return "Today";
      case remainingDays === 1:
        return "Tomorrow";
      default:
        return `${remainingDays}d left`;
    }
  })();

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
          <Stack spacing={1.25} sx={{ width: "100%" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: "text.primary",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {entry.name}
              </Typography>

              <Stack
                direction="row"
                spacing={0.75}
                sx={{ flexWrap: "wrap", rowGap: 0.75, alignItems: "center", flexShrink: 0 }}
              >
                <Chip
                  size="small"
                  label={entryCategory?.name || "Uncategorized"}
                  sx={{
                    maxWidth: { xs: "100%", sm: 180 },
                    backgroundColor: "secondary.light",
                    color: "text.primary",
                    "& .MuiChip-label": {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    },
                  }}
                />
                <Chip
                  size="small"
                  icon={entry.paid ? <PaidRoundedIcon /> : <ScheduleRoundedIcon />}
                  label={entry.paid ? "Paid" : "To be paid"}
                  color={entry.paid ? "success" : "default"}
                  variant={entry.paid ? "filled" : "outlined"}
                />
              </Stack>
            </Stack>

            <Box
              sx={{
                display: "grid",
                gap: { xs: 1.5, sm: 2.5 },
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  sm: "repeat(4, minmax(0, 1fr))",
                },
              }}
            >
              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Planned
                </Typography>
                <Typography sx={{ color: "text.primary", fontWeight: 600 }}>
                  {formatMoney(entry.plannedAmount, currencyCode)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Actual
                </Typography>
                <Typography sx={{ color: "text.primary", fontWeight: 600 }}>
                  {formatMoney(entry.actualAmount, currencyCode)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Due date
                </Typography>
                <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
                  {formatDate(entry.dueDate)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Days remaining
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: entry.paid ? "success.main" : deadlineColor(remainingDays),
                  }}
                >
                  {remainingDaysLabel}
                </Typography>
              </Box>
            </Box>

            {entry.note && (
              <Typography sx={{ color: "text.secondary", maxWidth: 720 }}>{entry.note}</Typography>
            )}
          </Stack>

          <Stack
            direction={{ xs: "row", md: "column" }}
            spacing={1}
            sx={{ justifyContent: "space-between" }}
          >
            <Button
              variant="text"
              sx={{ width: "fit-content" }}
              color="error"
              loading={loading}
              endIcon={<DeleteOutlineRoundedIcon />}
              onClick={() => handler(entry.id)}
            ></Button>
            <Button
              variant="text"
              sx={{ width: "fit-content" }}
              loading={loading}
              endIcon={<EditRoundedIcon />}
              onClick={() => openEditBudgetForm(entry)}
            ></Button>
          </Stack>
          {error && (
            <Alert
              severity="error"
              sx={{
                mt: 2,
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              {error}
            </Alert>
          )}
        </Stack>
      </Box>
      <Divider />
    </Paper>
  );
}
