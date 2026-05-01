import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import { Box, Stack } from "@mui/material";
import { formatMoney } from "src/shared/utils/formatMoney";
import BudgetSummaryCard from "./BudgetSummaryCard";
import BudgetSummaryOverview from "./BudgetSummaryOverview";

type BudgetSummaryProps = {
  budget: number | null;
  plannedExpenses: number;
  plannedItemsCount: number;
  actualExpenses: number;
  actualItemsCount: number;
  currencyCode?: string;
  nearestDeadline?: { days: number; date: string; name: string } | null;
};

export default function BudgetSummary({
  budget,
  plannedExpenses,
  plannedItemsCount,
  actualExpenses,
  actualItemsCount,
  currencyCode,
  nearestDeadline,
}: BudgetSummaryProps) {
  const remainingAfterPlanned = !budget ? null : budget - plannedExpenses;
  const remainingAfterActual = !budget ? null : budget - actualExpenses;

  return (
    <Stack direction={{ xs: "column", xl: "row" }} spacing={2} sx={{ mb: 3 }}>
      <BudgetSummaryOverview
        budget={budget}
        remainingAfterPlanned={remainingAfterPlanned}
        remainingAfterActual={remainingAfterActual}
        currencyCode={currencyCode}
        nearestDeadline={nearestDeadline}
      />

      <Box
        sx={{
          display: "grid",
          gap: 2,
          flex: { xs: "1 1 auto", xl: "1 1 0" },
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
        }}
      >
        <BudgetSummaryCard
          label="Planned Expenses"
          value={formatMoney(plannedExpenses, currencyCode)}
          itemCount={plannedItemsCount}
          helper="Reserved spending based on the current plan."
          icon={<TrendingDownRoundedIcon fontSize="small" />}
        />
        <BudgetSummaryCard
          label="Actual Expenses"
          value={formatMoney(actualExpenses, currencyCode)}
          itemCount={actualItemsCount}
          helper="What has already been recorded as real spend."
          icon={<PaidRoundedIcon fontSize="small" />}
        />
        <BudgetSummaryCard
          label="Remaining After Planned"
          value={formatMoney(remainingAfterPlanned, currencyCode)}
          itemCount={plannedItemsCount}
          helper="How the budget looks if every planned entry happens."
          icon={<SavingsRoundedIcon fontSize="small" />}
        />
        <BudgetSummaryCard
          label="Remaining After Actual"
          value={formatMoney(remainingAfterActual, currencyCode)}
          itemCount={actualItemsCount}
          helper="What remains based on real costs logged so far."
          icon={<WalletRoundedIcon fontSize="small" />}
        />
      </Box>
    </Stack>
  );
}
