import GuestItem from "./GuestItem";
import { useFetchGuests } from "../hooks/useFetchGuests";
import GuestListSkeleton from "./GuestsDashboardSkeleton";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { useGuestsStats } from "../hooks/useGuestsStats";
import GuestsStats from "./GuestsStats";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import ComponentHeader from "src/shared/ui/ComponentHeader";
import GuestsOverview from "./GuestsOverview/GuestsOverview";

export default function GuestsDashboard() {
  const { guests, loading, error } = useFetchGuests();
  const {
    totalGuests,
    totalEstimated,
    notYetInvited,
    invited,
    confirmed,
    declined,
    children,
    groupCounts,
    dietaryCounts,
  } = useGuestsStats(guests);

  if (loading) {
    return <GuestListSkeleton />;
  }
  if (error) {
    return <div className="text-center py-8 text-red-500">Failed to load guests.</div>;
  }

  return (
    <Stack spacing={2}>
      <GuestsOverview
        totalGuests={totalGuests}
        totalEstimated={totalEstimated}
        notYetInvited={notYetInvited}
        invited={invited}
        confirmed={confirmed}
        declined={declined}
        children={children}
      />
      <GuestsStats groupCounts={groupCounts} dietaryCounts={dietaryCounts} />
      <ComponentHeader
        title="Guest list"
        text="Manage every guest in one place, track responses, and your guests's preferences."
      />
      <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
        {guests && guests.length > 0 ? (
          guests.map((guest) => (
            <Grid
              size={{ xs: 12, md: 6 }}
              key={guest.id}
              sx={{
                display: "flex",
                flexBasis: { xs: "100%", md: "48%" },
                maxWidth: { xs: "100%", md: "48%" },
              }}
            >
              <GuestItem guest={guest} />
            </Grid>
          ))
        ) : (
          <Grid size={{ xs: 12 }}>
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
                <PeopleOutlineRoundedIcon color="primary" />
                <Typography variant="h6">No guests yet</Typography>
                <Typography sx={{ color: "text.secondary", maxWidth: 800 }}>
                  Start by adding your closest family and friends, then work your way through the
                  full list.
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
}
