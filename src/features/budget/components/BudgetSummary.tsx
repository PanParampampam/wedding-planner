import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { formatMoney } from "src/shared/utils/formatMoney";

type SummaryCardProps = {
  label: string;
  value: string;
  itemCount?: number;
  helper: string;
  icon: React.ReactNode;
};

function SummaryCard({
  label,
  value,
  itemCount,
  helper,
  icon,
}: SummaryCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,246,243,0.94) 100%)",
        minWidth: 0,
        height: "100%",
      }}
    >
      <Stack spacing={1.25} sx={{ height: "100%" }}>
        <Stack
          direction="row"
          spacing={1.25}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant="overline" sx={{ color: "text.secondary" }}>
            {label}
          </Typography>
          <Box
            sx={{
              position: "relative",
              width: 40,
              height: 40,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              backgroundColor: "secondary.light",
              color: "primary.main",
              flexShrink: 0,
            }}
          >
            {typeof itemCount === "number" && (
              <Box
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  minWidth: 20,
                  height: 20,
                  px: 0.5,
                  borderRadius: 999,
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  border: "2px solid",
                  borderColor: "background.paper",
                  fontSize: 11,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {itemCount}
              </Box>
            )}
            {icon}
          </Box>
        </Stack>
        <Typography
          variant="h5"
          sx={{ color: "text.primary", fontWeight: 700 }}
        >
          {value}
        </Typography>
        <Typography sx={{ color: "text.secondary", mt: "auto" }}>
          {helper}
        </Typography>
      </Stack>
    </Paper>
  );
}

type BudgetSummaryProps = {
  budget: number | null;
  plannedExpenses: number;
  plannedItemsCount: number;
  actualExpenses: number;
  actualItemsCount: number;
  currencyCode?: string;
};

export default function BudgetSummary({
  budget,
  plannedExpenses,
  plannedItemsCount,
  actualExpenses,
  actualItemsCount,
  currencyCode,
}: BudgetSummaryProps) {
  const remainingAfterPlanned =
    budget === null ? null : budget - plannedExpenses;
  const remainingAfterActual = budget === null ? null : budget - actualExpenses;

  return (
    <Stack direction={{ xs: "column", xl: "row" }} spacing={2} sx={{ mb: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,246,243,0.94) 100%)",
          minWidth: 0,
          flex: { xs: "1 1 auto", xl: "1.2 1 0" },
        }}
      >
        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <Box>
              <Typography variant="overline" sx={{ color: "text.secondary" }}>
                Budget Snapshot
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, lineHeight: 1.1, color: "text.primary" }}
              >
                {formatMoney(budget, currencyCode)}
              </Typography>
            </Box>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 3,
                display: "grid",
                placeItems: "center",
                backgroundColor: "secondary.light",
                color: "primary.main",
              }}
            >
              <WalletRoundedIcon />
            </Box>
          </Stack>

          <Typography sx={{ color: "text.secondary", maxWidth: 420 }}>
            Your current budget compared against both planned and already
            recorded spending.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="overline" sx={{ color: "text.secondary" }}>
                After Planned Expenses
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "text.primary" }}
              >
                {formatMoney(remainingAfterPlanned, currencyCode)}
              </Typography>
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="overline" sx={{ color: "text.secondary" }}>
                After Actual Expenses
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "text.primary" }}
              >
                {formatMoney(remainingAfterActual, currencyCode)}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          flex: { xs: "1 1 auto", xl: "1 1 0" },
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
        }}
      >
        <SummaryCard
          label="Planned Expenses"
          value={formatMoney(plannedExpenses, currencyCode)}
          itemCount={plannedItemsCount}
          helper="Reserved spending based on the current plan."
          icon={<TrendingDownRoundedIcon fontSize="small" />}
        />
        <SummaryCard
          label="Actual Expenses"
          value={formatMoney(actualExpenses, currencyCode)}
          itemCount={actualItemsCount}
          helper="What has already been recorded as real spend."
          icon={<PaidRoundedIcon fontSize="small" />}
        />
        <SummaryCard
          label="Remaining After Planned"
          value={formatMoney(remainingAfterPlanned, currencyCode)}
          itemCount={plannedItemsCount}
          helper="How the budget looks if every planned entry happens."
          icon={<SavingsRoundedIcon fontSize="small" />}
        />
        <SummaryCard
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
