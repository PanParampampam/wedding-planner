import { Box, Paper, Stack, Typography } from "@mui/material";

type GuestsStatCardProps = {
  label: string;
  value: number;
  helper: string;
  icon: React.ReactNode;
};

export default function GuestsStatCard({ label, value, helper, icon }: GuestsStatCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,246,243,0.94) 100%)",
        minWidth: 0,
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
              width: 36,
              height: 36,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              backgroundColor: "secondary.light",
              color: "primary.main",
            }}
          >
            {icon}
          </Box>
        </Stack>
        <Typography align="center" variant="h4" sx={{ color: "text.primary", fontWeight: 700 }}>
          {value}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>{helper}</Typography>
      </Stack>
    </Paper>
  );
}
