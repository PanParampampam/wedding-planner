import { Box, Paper, Skeleton, Stack } from "@mui/material";

export default function BudgetDashboardSkeleton() {
  return (
    <Stack spacing={2}>
      <Skeleton variant="text" width={180} height={52} />
      <Skeleton variant="text" width="60%" height={28} />

      {Array.from({ length: 3 }).map((_, index) => (
        <Paper
          key={index}
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(250,247,247,0.94) 100%)",
          }}
        >
          <Box sx={{ p: 2.5 }}>
            <Stack spacing={1.5}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <Skeleton variant="rounded" width={120} height={28} />
                <Skeleton variant="rounded" width={140} height={28} />
                <Skeleton variant="text" width="40%" height={34} />
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gap: { xs: 1.5, sm: 2.5 },
                  gridTemplateColumns: {
                    xs: "repeat(2, minmax(0, 1fr))",
                    sm: "repeat(4, minmax(0, 1fr))",
                  },
                }}
              >
                {Array.from({ length: 4 }).map((_, metricIndex) => (
                  <Stack key={metricIndex} spacing={0.5}>
                    <Skeleton variant="text" width="70%" height={20} />
                    <Skeleton variant="text" width="85%" height={26} />
                  </Stack>
                ))}
              </Box>
            </Stack>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
}
