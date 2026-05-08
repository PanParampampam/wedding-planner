import { Grid, Paper, Stack, Typography } from "@mui/material";
import GuestItem from "./GuestItem";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import type { Guest } from "../../types/guest.types";
import ComponentHeader from "src/shared/ui/ComponentHeader";

type GuestListProps = {
  guests: Guest[];
};

export default function GuestList({ guests }: GuestListProps) {
  return (
    <>
      <ComponentHeader
        title="Guest list"
        text="Manage every guest in one place, track responses, and your guests's preferences. The guests are ordered alphabetically by surname."
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
    </>
  );
}
