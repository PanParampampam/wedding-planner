import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { formatMoney } from "src/shared/utils/formatMoney";

type BudgetSummaryOverviewProps = {
  budget: number | null;
  remainingAfterPlanned: number | null;
  remainingAfterActual: number | null;
  currencyCode?: string;
  nearestDeadline?: { days: number; date: string; name: string } | null;
};

export default function BudgetSummaryOverview({
  budget,
  remainingAfterPlanned,
  remainingAfterActual,
  currencyCode,
  nearestDeadline,
}: BudgetSummaryOverviewProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
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
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography variant="overline" sx={{ color: "text.secondary" }}>
              Your initial budget:
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
