import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { formatMoney } from "src/shared/utils/formatMoney";

type BudgetOverviewProps = {
  budget: number | null;
  remainingAfterPlanned: number | null;
  remainingAfterActual: number | null;
  totalExpensesCount: number;
  currencyCode?: string;
  nearestDeadline?: { days: number; date: string; name: string } | null;
};

export default function BudgetOverview({
  budget,
  remainingAfterPlanned,
  remainingAfterActual,
  totalExpensesCount,
  currencyCode,
  nearestDeadline,
}: BudgetOverviewProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        px: { xs: 2.5, sm: 4 },
        py: { xs: 3, sm: 4 },
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        background: "var(--budget-overview-gradient)",
        minWidth: 0,
        flex: { xs: "1 1 auto", xl: "1.2 1 0" },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -36,
          right: -24,
          width: 140,
          height: 140,
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.45)",
        }}
      />

      <Stack spacing={2.5} sx={{ position: "relative" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Chip
            icon={<SavingsRoundedIcon />}
            label="Budget summary"
            sx={{
              fontWeight: 700,
              px: 0.5,
              color: "var(--budget-overview-main)",
              backgroundColor: "var(--budget-overview-soft)",
              border: "1px solid var(--budget-overview-border)",
              "& .MuiChip-icon": {
                color: "var(--budget-overview-main)",
              },
            }}
          />

          <Chip
            icon={<ReceiptLongRoundedIcon />}
            label={`${totalExpensesCount} total expenses`}
            color="primary"
            variant="outlined"
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.65)" }}
          />
        </Stack>

        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography variant="overline" sx={{ color: "text.secondary" }}>
              Your initial budget:
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                lineHeight: 1.1,
                color: "primary.main",
                letterSpacing: "-0.02em",
              }}
            >
              {formatMoney(budget, currencyCode)}
            </Typography>
          </Box>
        </Stack>

        <Typography sx={{ color: "text.secondary", maxWidth: 420 }}>
          Your current budget compared against both planned and already recorded spending.
        </Typography>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="overline" sx={{ color: "text.secondary" }}>
              After Planned Expenses
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
              {formatMoney(remainingAfterPlanned, currencyCode)}
            </Typography>
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="overline" sx={{ color: "text.secondary" }}>
              After Actual Expenses
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
              {formatMoney(remainingAfterActual, currencyCode)}
            </Typography>
          </Box>
          {nearestDeadline !== undefined && nearestDeadline !== null && (
            <Box sx={{ minWidth: 0, maxWidth: { md: "33%", lg: "50%" } }}>
              <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", mb: 0.25 }}>
                <EventAvailableRoundedIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                <Typography variant="overline" sx={{ color: "text.secondary" }}>
                  Next expense
                </Typography>
              </Stack>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color:
                    nearestDeadline.days < 0
                      ? "error.main"
                      : nearestDeadline.days <= 7
                        ? "warning.main"
                        : nearestDeadline.days <= 30
                          ? "primary.main"
                          : "success.main",
                }}
              >
                {nearestDeadline.days < 0
                  ? `${Math.abs(nearestDeadline.days)}d overdue`
                  : nearestDeadline.days === 0
                    ? "Today"
                    : nearestDeadline.days === 1
                      ? "Tomorrow"
                      : `${nearestDeadline.days}d left`}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {nearestDeadline.name} · {nearestDeadline.date}
              </Typography>
            </Box>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}
