import { Box, Typography } from "@mui/material";

type GuestItemInfoRowProps = {
  label: string;
  value: string;
};

export function GuestItemInfoRow({ label, value }: GuestItemInfoRowProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        px: 1.25,
        py: 0.9,
        borderRadius: 2,
        bgcolor: "secondary.light",
        border: 1,
        borderColor: "divider",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: "primary.dark",
          fontWeight: 700,
          letterSpacing: 0.4,
          textTransform: "uppercase",
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.primary", fontWeight: 600, textAlign: "right" }}
      >
        {value}
      </Typography>
    </Box>
  );
}
