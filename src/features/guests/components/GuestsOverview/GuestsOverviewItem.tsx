import { Box, Stack, Typography } from "@mui/material";

type GuestsOverviewItemProps = {
  icon: React.ReactNode;
  label: string;
  value: number;
};

export default function GuestsOverviewItem({ icon, label, value }: GuestsOverviewItemProps) {
  return (
    <Box
      sx={{
        p: 1.25,
        borderRadius: 2,
        backgroundColor: "rgba(255, 255, 255, 0.66)",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", mb: 0.5 }}>
        {icon}
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {label}:
        </Typography>
        <Typography sx={{ color: "text.primary", fontWeight: 700 }}>{value}</Typography>
      </Stack>
    </Box>
  );
}
