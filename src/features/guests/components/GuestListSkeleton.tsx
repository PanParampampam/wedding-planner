import { Box, Grid, Paper, Skeleton, Stack } from "@mui/material";

export default function GuestListSkeleton() {
  return (
    <Stack spacing={3} sx={{ mt: 1 }}>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", lg: "repeat(2, minmax(0, 1fr))" },
        }}
      >
        {Array.from({ length: 2 }).map((_, overviewIndex) => (
          <Paper
            key={overviewIndex}
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
              <Skeleton variant="text" width={140} height={24} />
              <Box
                sx={{
                  display: "grid",
                  gap: 1,
                  gridTemplateColumns: {
                    xs: "repeat(2, minmax(0, 1fr))",
                    sm:
                      overviewIndex === 0
                        ? "repeat(4, minmax(0, 1fr))"
                        : "repeat(3, minmax(0, 1fr))",
                  },
                }}
              >
                {Array.from({ length: overviewIndex === 0 ? 4 : 3 }).map((__, tileIndex) => (
                  <Paper
                    key={tileIndex}
                    elevation={0}
                    sx={{
                      p: 1.25,
                      borderRadius: 2,
                      backgroundColor: "secondary.light",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Skeleton variant="text" width="70%" height={18} />
                    <Skeleton variant="text" width="35%" height={24} />
                  </Paper>
                ))}
              </Box>
              <Skeleton variant="text" width="80%" height={24} />
            </Stack>
          </Paper>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(5, minmax(0, 1fr))",
          },
        }}
      >
        {Array.from({ length: 5 }).map((_, idx) => (
          <Paper
            key={idx}
            elevation={0}
            sx={{
              p: { xs: 2, sm: 2.5 },
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,246,243,0.94) 100%)",
            }}
          >
            <Stack spacing={1.25}>
              <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
                <Skeleton variant="text" width={72} height={18} />
                <Skeleton variant="rounded" width={36} height={36} />
              </Stack>
              <Skeleton variant="text" width={50} height={46} sx={{ alignSelf: "center" }} />
              <Skeleton variant="text" width="90%" height={24} />
            </Stack>
          </Paper>
        ))}
      </Box>

      <Stack spacing={1} sx={{ mb: 1 }}>
        <Skeleton variant="text" width={180} height={52} />
        <Skeleton variant="text" width="65%" height={28} />
      </Stack>

      <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
        {Array.from({ length: 4 }).map((_, idx) => (
          <Grid
            key={idx}
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              flexBasis: { xs: "100%", md: "48%" },
              maxWidth: { xs: "100%", md: "48%" },
            }}
          >
            <Box
              sx={{
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
                p: 3,
                border: 1,
                borderColor: "divider",
                minHeight: 220,
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Skeleton variant="text" width="45%" height={36} sx={{ alignSelf: "center" }} />

              <Box
                sx={{
                  display: "grid",
                  gap: 1.25,
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                }}
              >
                {Array.from({ length: 4 }).map((__, metricIndex) => (
                  <Paper
                    key={metricIndex}
                    variant="outlined"
                    sx={{ p: 1.25, bgcolor: "grey.50", borderColor: "grey.200", borderRadius: 2 }}
                  >
                    <Skeleton variant="text" width="65%" height={18} />
                    <Skeleton variant="text" width="80%" height={20} />
                  </Paper>
                ))}
              </Box>

              <Skeleton variant="rectangular" height={1} />

              <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
                <Skeleton variant="text" width="85%" height={22} />
                <Skeleton variant="text" width="70%" height={22} />
              </Stack>

              <Stack direction="row" spacing={1.5} sx={{ justifyContent: "space-between", pt: 1 }}>
                <Skeleton variant="rounded" width={40} height={32} />
                <Skeleton variant="rounded" width={40} height={32} />
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
