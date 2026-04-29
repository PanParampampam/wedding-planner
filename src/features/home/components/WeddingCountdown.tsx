import dayjs from "dayjs";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import type { User } from "src/shared/types/common.types";

export default function WeddingCountdown({
  weddingDate,
  userName,
}: {
  weddingDate: User["weddingDate"];
  userName: User["name"];
}) {
  const normalizedWeddingDate = dayjs(weddingDate);
  const today = dayjs().startOf("day");
  const daysUntilWedding = normalizedWeddingDate
    .startOf("day")
    .diff(today, "day");

  const countdownLabel = (daysUntilWedding: number) => {
    if (daysUntilWedding > 0) {
      return `${daysUntilWedding} days until the big day!`;
    } else if (daysUntilWedding === 0) {
      return "Your big day is here!";
    } else {
      return `${Math.abs(daysUntilWedding)} days since the wedding`;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        background: "var(--wedding-countdown-gradient)",
        px: { xs: 2.5, sm: 4 },
        py: { xs: 3, sm: 4 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -36,
          right: -24,
          width: 140,
          height: 140,
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.45)",
        }}
      />

      <Stack spacing={2.5} sx={{ position: "relative" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Chip
            icon={<FavoriteRoundedIcon />}
            label="Wedding countdown"
            sx={{
              fontWeight: 700,
              px: 0.5,
              color: "var(--wedding-heart-main)",
              backgroundColor: "var(--wedding-heart-soft)",
              border: "1px solid var(--wedding-heart-border)",
              "& .MuiChip-icon": {
                color: "var(--wedding-heart-main)",
              },
            }}
          />

          <Chip
            icon={<CalendarMonthRoundedIcon />}
            label={
              normalizedWeddingDate.isValid()
                ? normalizedWeddingDate.format("DD/MM/YYYY")
                : "Date not set"
            }
            color="primary"
            variant="outlined"
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.65)" }}
          />
        </Stack>

        <Stack spacing={0.75}>
          <Typography variant="overline" sx={{ color: "text.secondary" }}>
            {`${userName}, you have`}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "primary.main",
            }}
          >
            {countdownLabel(daysUntilWedding)}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {daysUntilWedding === null
              ? "Add or reload your wedding date to see the live countdown here."
              : daysUntilWedding >= 0
                ? "Your big day is what matters most. We'll keep all the other details organized around it."
                : "Your wedding date has passed, but you can still keep your planning data and guest history organized here."}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
