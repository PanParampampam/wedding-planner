import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import MarkEmailUnreadRoundedIcon from "@mui/icons-material/MarkEmailUnreadRounded";
import ChildCareRoundedIcon from "@mui/icons-material/ChildCareRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import { Box, Stack } from "@mui/material";
import GuestsStatCard from "./GuestsStatCard";
import ComponentHeader from "src/shared/ui/ComponentHeader";

type GuestsStatsProps = {
  total: number;
  notYetInvited: number;
  invited: number;
  confirmed: number;
  declined: number;
  children: number;
  groupCounts: {
    family: number;
    friends: number;
    coworkers: number;
    other: number;
  };
  dietaryCounts: {
    vegetarian: number;
    vegan: number;
    glutenFree: number;
  };
};

export default function GuestsStats({
  total,
  notYetInvited,
  invited,
  confirmed,
  declined,
  children,
}: GuestsStatsProps) {
  return (
    <Stack spacing={2} sx={{ mb: 3 }}>
      <ComponentHeader
        title="Guest stats"
        text="Track the status of invited guests and declined invitations. Click on a card to filter guests by given category (to be implemented)"
      />
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3, minmax(0, 1fr))",
            xl: "repeat(6, minmax(0, 1fr))",
          },
        }}
      >
        <GuestsStatCard
          label="Total"
          value={total}
          helper="Everyone currently in your list."
          icon={<GroupRoundedIcon fontSize="small" />}
        />
        <GuestsStatCard
          label="Not invited"
          value={notYetInvited}
          helper="Guests who didn't get an invite yet."
          icon={<MarkEmailUnreadRoundedIcon fontSize="small" />}
        />
        <GuestsStatCard
          label="Invited"
          value={invited}
          helper="Guests who already got an invite."
          icon={<MarkEmailReadRoundedIcon fontSize="small" />}
        />
        <GuestsStatCard
          label="Confirmed"
          value={confirmed}
          helper="Guests who have replied yes."
          icon={<HowToRegRoundedIcon fontSize="small" />}
        />
        <GuestsStatCard
          label="Declined"
          value={declined}
          helper="Guests who declined the invitation."
          icon={<BlockRoundedIcon fontSize="small" />}
        />
        <GuestsStatCard
          label="Children"
          value={children}
          helper="Children count across all guests."
          icon={<ChildCareRoundedIcon fontSize="small" />}
        />
      </Box>
    </Stack>
  );
}
