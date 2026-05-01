import { Box, Paper, Stack, Typography } from "@mui/material";

type GuestsStatsOverviewProps = {
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

export default function GuestsStatsOverview({
  groupCounts,
  dietaryCounts,
}: GuestsStatsOverviewProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: { xs: "1fr", lg: "repeat(2, minmax(0, 1fr))" },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,246,243,0.94) 100%)",
        }}
      >
        <Stack spacing={1.5}>
          <Typography variant="overline" sx={{ color: "text.secondary" }}>
            Guests by group
          </Typography>
          <Box
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                sm: "repeat(4, minmax(0, 1fr))",
              },
            }}
          >
            <Box
              sx={{
                p: 1.25,
                borderRadius: 2,
                backgroundColor: "secondary.light",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Family
              </Typography>
              <Typography sx={{ color: "text.primary", fontWeight: 700 }}>
                {groupCounts.family}
              </Typography>
            </Box>
            <Box
              sx={{
                p: 1.25,
                borderRadius: 2,
                backgroundColor: "secondary.light",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Friends
              </Typography>
              <Typography sx={{ color: "text.primary", fontWeight: 700 }}>
                {groupCounts.friends}
              </Typography>
            </Box>
            <Box
              sx={{
                p: 1.25,
                borderRadius: 2,
                backgroundColor: "secondary.light",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Coworkers
              </Typography>
              <Typography sx={{ color: "text.primary", fontWeight: 700 }}>
                {groupCounts.coworkers}
              </Typography>
            </Box>
            <Box
              sx={{
                p: 1.25,
                borderRadius: 2,
                backgroundColor: "secondary.light",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Other
              </Typography>
              <Typography sx={{ color: "text.primary", fontWeight: 700 }}>
                {groupCounts.other}
              </Typography>
            </Box>
          </Box>
          <Typography sx={{ color: "text.secondary" }}>
            Track invitation progress and spot where your guest list is growing most.
          </Typography>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,246,243,0.94) 100%)",
        }}
      >
        <Stack spacing={1.5}>
          <Typography variant="overline" sx={{ color: "text.secondary" }}>
            Dietary restrictions
          </Typography>
          <Box
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                sm: "repeat(3, minmax(0, 1fr))",
              },
            }}
          >
            <Box
              sx={{
                p: 1.25,
                borderRadius: 2,
                backgroundColor: "secondary.light",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Vegetarian
              </Typography>
              <Typography sx={{ color: "text.primary", fontWeight: 700 }}>
                {dietaryCounts.vegetarian}
              </Typography>
            </Box>
            <Box
              sx={{
                p: 1.25,
                borderRadius: 2,
                backgroundColor: "secondary.light",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Vegan
              </Typography>
              <Typography sx={{ color: "text.primary", fontWeight: 700 }}>
                {dietaryCounts.vegan}
              </Typography>
            </Box>
            <Box
              sx={{
                p: 1.25,
                borderRadius: 2,
                backgroundColor: "secondary.light",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Gluten free
              </Typography>
              <Typography sx={{ color: "text.primary", fontWeight: 700 }}>
                {dietaryCounts.glutenFree}
              </Typography>
            </Box>
          </Box>
          <Typography sx={{ color: "text.secondary" }}>
            Keep the information for planning menus and notifying your catering team early.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
