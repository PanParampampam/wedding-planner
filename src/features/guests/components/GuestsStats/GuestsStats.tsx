import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import Face3RoundedIcon from "@mui/icons-material/Face3Rounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import DinnerDiningRoundedIcon from "@mui/icons-material/DinnerDiningRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import BakeryDiningRoundedIcon from "@mui/icons-material/BakeryDiningRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import DirectionsBusRoundedIcon from "@mui/icons-material/DirectionsBusRounded";
import NoDrinksRoundedIcon from "@mui/icons-material/NoDrinksRounded";
import { Box, Stack, Typography } from "@mui/material";
import GuestsStatCard from "./GuestsStatCard";
import ComponentHeader from "src/shared/ui/ComponentHeader";
import GuestsRangeStatCard from "./GuestsRangeStatCard";

type YesMaybeCounts = {
  yes: number;
  unknown: number;
};

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
    unknown: number;
  };
  staysOvernightCounts: YesMaybeCounts;
  needsTransportCounts: YesMaybeCounts;
  alcoholFreeCounts: YesMaybeCounts;
  side: {
    both: number;
    bride: number;
    groom: number;
  };
};

export default function GuestsStats({
  groupCounts,
  dietaryCounts,
  staysOvernightCounts,
  needsTransportCounts,
  alcoholFreeCounts,
  side,
}: GuestsStatsProps) {
  return (
    <Stack spacing={4} sx={{ mb: 3 }}>
      <ComponentHeader
        title="Guest stats"
        text="Detailed information about who is coming from each part of your list, what are their preferences, and what dietary planning you need to account for."
      />

      <Stack spacing={1.5}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Sides
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, minmax(0, 1fr))",
            },
          }}
        >
          <GuestsStatCard
            label="Bride side"
            value={side.bride}
            helper="The number of guests of the bride side."
            icon={<Face3RoundedIcon fontSize="small" />}
          />
          <GuestsStatCard
            label="Groom side"
            value={side.groom}
            helper="The number of guests of the groom side."
            icon={<FaceRoundedIcon fontSize="small" />}
          />
          <GuestsStatCard
            label="Both sides"
            value={side.both}
            helper="The number of guests from both the bride and the groom."
            icon={<PeopleRoundedIcon fontSize="small" />}
          />
        </Box>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Groups
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
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
        </Box>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Preferences
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, minmax(0, 1fr))",
            },
          }}
        >
          <GuestsRangeStatCard
            label="Stays overnight"
            minValue={staysOvernightCounts.yes}
            maxValue={staysOvernightCounts.unknown}
            helper={`${staysOvernightCounts.yes} of your gests will need a place to stay, while ${staysOvernightCounts.unknown} are not sure yet.`}
            icon={<HotelRoundedIcon fontSize="small" />}
          />
          <GuestsRangeStatCard
            label="Need a transport"
            minValue={needsTransportCounts.yes}
            maxValue={needsTransportCounts.unknown}
            helper={`${needsTransportCounts.yes} of your gests will need a transport, while ${needsTransportCounts.unknown} are not sure yet.`}
            icon={<DirectionsBusRoundedIcon fontSize="small" />}
          />
          <GuestsRangeStatCard
            label="Alcohol free"
            minValue={alcoholFreeCounts.yes}
            maxValue={alcoholFreeCounts.unknown}
            helper={`${alcoholFreeCounts.yes} of your gests will drink only non-alcoholic beverages, while ${alcoholFreeCounts.unknown} are not sure yet.`}
            icon={<NoDrinksRoundedIcon fontSize="small" />}
          />
        </Box>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Dietary restrictions
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, minmax(0, 1fr))",
            },
          }}
        >
          <GuestsRangeStatCard
            label="Vegetarian"
            minValue={dietaryCounts.vegetarian}
            maxValue={dietaryCounts.unknown}
            helper={`${dietaryCounts.vegetarian} of your guests will need a vegetarian meal option. In total, up to ${dietaryCounts.vegetarian + dietaryCounts.unknown} guests may need it.`}
            icon={<DinnerDiningRoundedIcon fontSize="small" />}
          />
          <GuestsRangeStatCard
            label="Vegan"
            minValue={dietaryCounts.vegan}
            maxValue={dietaryCounts.unknown}
            helper={`${dietaryCounts.vegan} of your guests will need a fully plant-based meal option. In total, up to ${dietaryCounts.vegan + dietaryCounts.unknown} guests may need it.`}
            icon={<SpaRoundedIcon fontSize="small" />}
          />
          <GuestsRangeStatCard
            label="Gluten free"
            minValue={dietaryCounts.glutenFree}
            maxValue={dietaryCounts.unknown}
            helper={`${dietaryCounts.glutenFree} of your guests will need gluten-free planning support. In total, up to ${dietaryCounts.glutenFree + dietaryCounts.unknown} guests may need it.`}
            icon={<BakeryDiningRoundedIcon fontSize="small" />}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
