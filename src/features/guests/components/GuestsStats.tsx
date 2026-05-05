import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import DinnerDiningRoundedIcon from "@mui/icons-material/DinnerDiningRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import BakeryDiningRoundedIcon from "@mui/icons-material/BakeryDiningRounded";
import { Box, Stack } from "@mui/material";
import GuestsStatCard from "./GuestsStatCard";
import ComponentHeader from "src/shared/ui/ComponentHeader";

type GuestsStatsProps = {
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

export default function GuestsStats({ groupCounts, dietaryCounts }: GuestsStatsProps) {
  return (
    <Stack spacing={2} sx={{ mb: 3 }}>
      <ComponentHeader
        title="Guest stats"
        text="Detailed information about who is coming from each part of your list and what dietary planning you need to account for."
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
          label="Family"
          value={groupCounts.family}
          helper="Guests connected through close family relationships."
          icon={<Diversity3RoundedIcon fontSize="small" />}
        />
        <GuestsStatCard
          label="Friends"
          value={groupCounts.friends}
          helper="Friends currently included in your celebration plans."
          icon={<Groups2RoundedIcon fontSize="small" />}
        />
        <GuestsStatCard
          label="Coworkers"
          value={groupCounts.coworkers}
          helper="People invited from work or professional circles."
          icon={<ApartmentRoundedIcon fontSize="small" />}
        />
        <GuestsStatCard
          label="Other"
          value={groupCounts.other}
          helper="Everyone else who does not fit the main guest groups."
          icon={<MoreHorizRoundedIcon fontSize="small" />}
        />
        <GuestsStatCard
          label="Vegetarian"
          value={dietaryCounts.vegetarian}
          helper="Guests who need a vegetarian meal option."
          icon={<DinnerDiningRoundedIcon fontSize="small" />}
        />
        <GuestsStatCard
          label="Vegan"
          value={dietaryCounts.vegan}
          helper="Guests who need a fully plant-based meal option."
          icon={<SpaRoundedIcon fontSize="small" />}
        />
        <GuestsStatCard
          label="Gluten free"
          value={dietaryCounts.glutenFree}
          helper="Guests who need gluten-free planning support."
          icon={<BakeryDiningRoundedIcon fontSize="small" />}
        />
      </Box>
    </Stack>
  );
}
