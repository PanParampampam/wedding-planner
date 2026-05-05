import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import ChildCareRoundedIcon from "@mui/icons-material/ChildCareRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import MarkEmailUnreadRoundedIcon from "@mui/icons-material/MarkEmailUnreadRounded";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import GuestsOverviewItem from "./GuestsOverviewItem";

type GuestsOverviewProps = {
  totalGuests: number;
  totalEstimated: number;
  notYetInvited: number;
  invited: number;
  confirmed: number;
  declined: number;
  children: number;
};

export default function GuestsOverview({
  totalGuests,
  totalEstimated,
  notYetInvited,
  invited,
  confirmed,
  declined,
  children,
}: GuestsOverviewProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        px: { xs: 2.5, sm: 4 },
        py: { xs: 3, sm: 4 },
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        background: "var(--guests-overview-gradient)",
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
            icon={<GroupsRoundedIcon />}
            label="Guests summary"
            sx={{
              fontWeight: 700,
              px: 0.5,
              color: "var(--guests-overview-main)",
              backgroundColor: "var(--guests-overview-soft)",
              border: "1px solid var(--guests-overview-border)",
              "& .MuiChip-icon": {
                color: "var(--guests-overview-main)",
              },
            }}
          />

          <Chip
            icon={<BadgeRoundedIcon />}
            label={`${totalGuests} total guests`}
            color="primary"
            variant="outlined"
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.65)" }}
          />
        </Stack>

        <Box>
          <Typography variant="overline" sx={{ color: "text.secondary" }}>
            Your guest list right now
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              lineHeight: 1.1,
              color: "primary.main",
              letterSpacing: "-0.02em",
            }}
          >
            {confirmed} confirmed, {invited} waiting on a reply
          </Typography>
        </Box>

        <Typography sx={{ color: "text.secondary", maxWidth: 520 }}>
          Keep the most important guest planning metrics visible at a glance: total headcount,
          invitation progress, confirmed responses, declines, and children count.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
            },
          }}
        >
          <GuestsOverviewItem
            icon={<GroupsRoundedIcon sx={{ fontSize: 16, color: "text.secondary" }} />}
            label="Estimated (total minus declined)"
            value={totalEstimated}
          />
          <GuestsOverviewItem
            icon={<MarkEmailUnreadRoundedIcon sx={{ fontSize: 16, color: "text.secondary" }} />}
            label="Not yet invited"
            value={notYetInvited}
          />
          <GuestsOverviewItem
            icon={<MarkEmailReadRoundedIcon sx={{ fontSize: 16, color: "text.secondary" }} />}
            label="Invited"
            value={invited}
          />
          <GuestsOverviewItem
            icon={<HowToRegRoundedIcon sx={{ fontSize: 16, color: "success.main" }} />}
            label="Confirmed"
            value={confirmed}
          />
          <GuestsOverviewItem
            icon={<BlockRoundedIcon sx={{ fontSize: 16, color: "error.main" }} />}
            label="Declined"
            value={declined}
          />
          <GuestsOverviewItem
            icon={<ChildCareRoundedIcon sx={{ fontSize: 16, color: "text.secondary" }} />}
            label="Children"
            value={children}
          />
        </Box>
      </Stack>
    </Paper>
  );
}
