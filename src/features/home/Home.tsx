import { Paper, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Stack spacing={1.5}>
        <Typography
          variant="h4"
          sx={{ textAlign: "left", color: "primary.main", fontWeight: 700 }}
        >
          Welcome to your Wedding Planner
        </Typography>
        <Typography sx={{ textAlign: "left", color: "text.secondary" }}>
          Keep your guest list, budget, and wedding details organized in one
          place.
        </Typography>
      </Stack>
    </Paper>
  );
}
