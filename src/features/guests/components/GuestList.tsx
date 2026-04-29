import GuestItem from "./GuestItem";
import { useGuests } from "../hooks/useGuests";
import GuestListSkeleton from "./GuestListSkeleton";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { useGuestsStats } from "../hooks/useGuestsStats";
import GuestAlert from "./GuestAlert";
import GuestsStats from "./GuestsStats";
import type { Guest } from "../types/guest.types";

export default function GuestList({
  openEditGuestForm,
}: {
  openEditGuestForm: (guest: Guest) => void;
}) {
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
    <>
      <GuestsStats total={total} confirmed={confirmed} attending={attending} />
      <GuestAlert />
      <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
        {guests && guests.length > 0 ? (
          guests.map((guest) => (
            <Grid
              size={{ xs: 12, md: 6 }}
              key={guest.id}
              sx={{
                display: "flex",
                flexBasis: { xs: "100%", md: "49%" },
                maxWidth: { xs: "100%", md: "49%" },
              }}
            >
              <GuestItem guest={guest} openEditGuestForm={openEditGuestForm} />
            </Grid>
          ))
        ) : (
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              flexBasis: { xs: "100%", md: "49%" },
              maxWidth: { xs: "100%", md: "49%" },
            }}
          >
            <Box
              sx={{
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
                p: 3,
                border: 1,
                borderColor: "grey.200",
                minHeight: 220,
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                transition: "box-shadow 0.2s",
                "&:hover": { boxShadow: 4 },
              }}
            >
              No guests found.
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
}
