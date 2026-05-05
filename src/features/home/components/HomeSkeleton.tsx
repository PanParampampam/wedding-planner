import { Box, Paper, Skeleton, Stack } from "@mui/material";

export default function HomeSkeleton() {
  return (
    <Stack spacing={2.5}>
      <Skeleton variant="rounded" height={188} sx={{ borderRadius: 4 }} />

      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: {
            xs: "1fr",
            lg: "repeat(2, minmax(320px, 50%))",
          },
          justifyContent: { lg: "center" },
          alignItems: "stretch",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            minHeight: 340,
          }}
        >
          <Stack spacing={2.5}>
            <Skeleton variant="rounded" width={160} height={34} />
            <Skeleton variant="text" width="62%" height={44} />
            <Box
              sx={{
                display: "grid",
                gap: 1.25,
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(120px, 1fr))",
                  md: "repeat(3, minmax(120px, 1fr))",
                },
              }}
            >
              <Skeleton variant="rounded" height={68} />
              <Skeleton variant="rounded" height={68} />
              <Skeleton variant="rounded" height={68} />
              <Skeleton variant="rounded" height={68} />
              <Skeleton variant="rounded" height={68} />
              <Skeleton variant="rounded" height={68} />
            </Box>
          </Stack>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            minHeight: 340,
          }}
        >
          <Stack spacing={2.5}>
            <Skeleton variant="rounded" width={172} height={34} />
            <Skeleton variant="text" width="58%" height={44} />
            <Skeleton variant="rounded" height={60} />
            <Skeleton variant="rounded" height={60} />
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
}
