import GuestItem from "./GuestItem";
import { useGuests } from "../hooks/useGuests";
import GuestListSkeleton from "./GuestListSkeleton";
import { Container, Grid, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useGuestsStats } from "../hooks/useGuestsStats";
import GuestAlert from "./GuestAlert";
import GuestsStats from "./GuestsStats";

export default function GuestList() {
  const { guests, loading, error } = useGuests();
  const { total, confirmed, attending } = useGuestsStats(guests);

  if (loading) {
    return <GuestListSkeleton />;
  }
  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load guests.
      </div>
    );
  }

  return (
    <Box sx={{ maxWidth: { xs: "100%", lg: 1200 }, marginX: "auto", mt: 8 }}>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Guest List</h2>
      <GuestsStats total={total} confirmed={confirmed} attending={attending} />
      <GuestAlert />
      <Grid container spacing={3}>
        {guests && guests.length > 0 ? (
          guests.map((guest) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={guest.id}>
              <GuestItem {...guest} />
            </Grid>
          ))
        ) : (
          <Grid size={{ xs: 6, md: 8 }}>
            <Box sx={{ textAlign: "center", color: "text.secondary" }}>
              No guests found.
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
