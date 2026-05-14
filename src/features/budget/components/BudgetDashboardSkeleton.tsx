import { Box, Paper, Skeleton, Stack } from "@mui/material";

export default function BudgetDashboardSkeleton() {
  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: "column", xl: "row" }} spacing={2}>
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
            background: "var(--budget-overview-gradient)",
            minWidth: 0,
            flex: { xs: "1 1 auto", xl: "1.2 1 0" },
          }}
        >
          <Stack spacing={2.5}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Skeleton variant="rounded" width={136} height={32} />
              <Skeleton variant="rounded" width={164} height={32} />
            </Stack>

            <Box>
              <Skeleton variant="text" width={220} height={28} />
              <Skeleton variant="text" width={280} height={76} />
            </Box>

            <Skeleton variant="text" width="85%" height={24} />

            <Stack spacing={1.25}>
              <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
                <Skeleton variant="text" width={110} height={22} />
                <Skeleton variant="text" width={130} height={34} />
              </Stack>
              <Box>
                <Skeleton variant="text" width={150} height={22} />
                <Skeleton variant="text" width={150} height={34} />
              </Box>
              <Box>
                <Skeleton variant="text" width={92} height={22} />
                <Skeleton variant="text" width={104} height={34} />
                <Skeleton variant="text" width={180} height={20} />
              </Box>
            </Stack>
          </Stack>
        </Paper>

        <Box
          sx={{
            display: "grid",
            gap: 2,
            flex: { xs: "1 1 auto", xl: "1 1 0" },
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                p: 2,
              }}
            >
              <Stack spacing={1}>
                <Skeleton variant="rounded" width={34} height={34} />
                <Skeleton variant="text" width="78%" height={22} />
                <Skeleton variant="text" width="58%" height={36} />
                <Skeleton variant="text" width="92%" height={20} />
              </Stack>
            </Paper>
          ))}
        </Box>
      </Stack>

      <Stack spacing={2} sx={{ mb: 3 }}>
        <Skeleton variant="text" width={130} height={44} />
        <Skeleton variant="text" width="68%" height={22} />
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
          {Array.from({ length: 8 }).map((_, chipIndex) => (
            <Skeleton key={chipIndex} variant="rounded" width={112} height={32} />
          ))}
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Skeleton variant="text" width={120} height={44} />
        <Skeleton variant="text" width="74%" height={22} />

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
                  <Skeleton variant="text" width="36%" height={42} />
                  <Stack direction="row" spacing={1}>
                    <Skeleton variant="rounded" width={126} height={28} />
                    <Skeleton variant="rounded" width={96} height={28} />
                  </Stack>
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
                      <Skeleton variant="text" width="85%" height={28} />
                    </Stack>
                  ))}
                </Box>

                <Skeleton variant="text" width="66%" height={24} />
              </Stack>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
}
