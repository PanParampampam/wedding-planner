import PageHeader from "../../shared/ui/PageHeader";
import { useRequiredAuthProvider } from "../authProvider/hooks/useAuthProvider";
import WeddingCountdown from "./components/WeddingCountdown";
import { useFetchHomeDashboard } from "./hooks/useFetchHomeDashboard";
import BudgetOverview from "../budget/components/budgetSummary/BudgetOverview";
import GuestsOverview from "../guests/components/GuestsOverview/GuestsOverview";
import { Alert, Box, Stack } from "@mui/material";
import { daysUntil } from "../budget/utils/budget.utils";
import { formatDate } from "src/shared/utils/formatDate";
import HomeSkeleton from "./components/HomeSkeleton";

export default function Home() {
  const { user } = useRequiredAuthProvider();
  const { home, loading, error } = useFetchHomeDashboard();

  const statuses = home?.guestsOverview ?? [];

  const totalGuests = statuses.length;
  const notYetInvited = statuses.filter((guest) => guest.status === "not yet invited").length;
  const invited = statuses.filter((guest) => guest.status === "invited").length;
  const confirmed = statuses.filter((guest) => guest.status === "confirmed").length;
  const declined = statuses.filter((guest) => guest.status === "declined").length;
  const children = statuses.reduce((sum, guest) => sum + Number(guest.children ?? 0), 0);
  const totalEstimated = totalGuests - declined;

  const budgetOverview = home?.budgetOverview;
  const remainingAfterPlanned =
    budgetOverview?.budget !== null && budgetOverview !== undefined
      ? budgetOverview.budget - budgetOverview.plannedExpenses
      : null;
  const remainingAfterActual =
    budgetOverview?.budget !== null && budgetOverview !== undefined
      ? budgetOverview.budget - budgetOverview.actualExpenses
      : null;

  const nearestDeadline = budgetOverview?.nearestDeadlineEntry
    ? {
        days: daysUntil(budgetOverview.nearestDeadlineEntry.dueDate) ?? 0,
        date: formatDate(budgetOverview.nearestDeadlineEntry.dueDate),
        name: budgetOverview.nearestDeadlineEntry.name,
      }
    : null;

  return (
    <Stack>
      <PageHeader
        title="Welcome to your Wedding Planner"
        description="Keep your guest list, budget, and wedding details organized in one place."
      />

      {loading && <HomeSkeleton />}

      {!loading && error && <Alert severity="error">Failed to load dashboard data.</Alert>}

      {!loading && !error && (
        <Stack spacing={2.5}>
          <WeddingCountdown weddingDate={user.weddingDate} userName={user.name} />

          <Box
            sx={{
              display: "grid",
              gap: 2.5,
              gridTemplateColumns: {
                xs: "1fr",
                lg: "repeat(2, minmax(320px, 50%))",
              },
              justifyContent: { lg: "center" },
              alignItems: "stretch",
            }}
          >
            <Box sx={{ display: "flex", "& > *": { height: "100%" } }}>
              <GuestsOverview
                totalGuests={totalGuests}
                totalEstimated={totalEstimated}
                notYetInvited={notYetInvited}
                invited={invited}
                confirmed={confirmed}
                declined={declined}
                children={children}
              />
            </Box>

            <Box sx={{ display: "flex", "& > *": { height: "100%" } }}>
              <BudgetOverview
                budget={budgetOverview?.budget ?? null}
                remainingAfterPlanned={remainingAfterPlanned}
                remainingAfterActual={remainingAfterActual}
                totalExpensesCount={budgetOverview?.totalExpensesCount ?? 0}
                currencyCode={user.currencyCode}
                nearestDeadline={nearestDeadline}
              />
            </Box>
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
