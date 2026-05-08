import { Box, Paper, Stack, Typography } from "@mui/material";

type SummaryCardProps = {
  label: string;
  value: string;
  itemCount?: number;
  helper: string;
  icon: React.ReactNode;
};

export default function BudgetSummaryCard({
  label,
  value,
  itemCount,
  helper,
  icon,
}: SummaryCardProps) {
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
        height: "100%",
      }}
    >
      <Stack spacing={1.25} sx={{ height: "100%" }}>
        <Stack
          direction="row"
          spacing={1.25}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant="overline" sx={{ color: "text.secondary", lineHeight: 1.2 }}>
            {label}
          </Typography>
          <Box
            sx={{
              position: "relative",
              width: 40,
              height: 40,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              backgroundColor: "secondary.light",
              color: "primary.main",
              flexShrink: 0,
            }}
          >
            {typeof itemCount === "number" && (
              <Box
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  minWidth: 20,
                  height: 20,
                  px: 0.5,
                  borderRadius: 999,
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  border: "2px solid",
                  borderColor: "background.paper",
                  fontSize: 11,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {itemCount}
              </Box>
            )}
            {icon}
          </Box>
        </Stack>
        <Typography
          variant="h5"
          sx={{ color: "text.primary", fontWeight: 700, fontSize: { xs: "1.3rem", sm: "1.5rem" } }}
        >
          {value}
        </Typography>
        <Typography sx={{ color: "text.secondary", mt: "auto" }}>{helper}</Typography>
      </Stack>
    </Paper>
  );
}
