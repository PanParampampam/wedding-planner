import { Box, Grid, Paper, Skeleton, Stack } from "@mui/material";

const statsSections = [
  {
    key: "sides",
    cards: 3,
    columns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
  },
  {
    key: "groups",
    cards: 4,
    columns: {
      xs: "1fr",
      sm: "repeat(2, minmax(0, 1fr))",
      md: "repeat(4, minmax(0, 1fr))",
    },
  },
  {
    key: "preferences",
    cards: 3,
    columns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
  },
  {
    key: "dietary",
    cards: 3,
    columns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
  },
] as const;

export default function GuestsDashboardSkeleton() {
  return (
    <Stack spacing={2}>
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
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Skeleton variant="rounded" width={148} height={32} />
            <Skeleton variant="rounded" width={168} height={32} />
          </Stack>

          <Box>
            <Skeleton variant="text" width={320} height={24} />
            <Skeleton variant="text" width={220} height={66} />
          </Box>

          <Skeleton variant="text" width="88%" height={24} />

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
            {Array.from({ length: 5 }).map((_, tileIndex) => (
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
        </Stack>
      </Paper>

      <Stack spacing={4} sx={{ mb: 3 }}>
        <Stack spacing={1}>
          <Skeleton variant="text" width={150} height={48} />
          <Skeleton variant="text" width="72%" height={24} />
        </Stack>

        {statsSections.map((section) => (
          <Stack key={section.key} spacing={1.5}>
            <Skeleton variant="text" width={130} height={40} />
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: section.columns,
              }}
            >
              {Array.from({ length: section.cards }).map((_, cardIdx) => (
                <Paper
                  key={cardIdx}
                  elevation={0}
                  sx={{
                    p: { xs: 2, sm: 2.5 },
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,246,243,0.94) 100%)",
                    minWidth: 0,
                  }}
                >
                  <Stack spacing={1.25} sx={{ height: "100%" }}>
                    <Stack
                      direction="row"
                      spacing={1.25}
                      sx={{ alignItems: "center", justifyContent: "space-between" }}
                    >
                      <Skeleton variant="text" width={88} height={20} />
                      <Skeleton variant="rounded" width={36} height={36} />
                    </Stack>
                    <Skeleton variant="text" width={70} height={46} sx={{ alignSelf: "center" }} />
                    <Skeleton variant="text" width="92%" height={24} />
                  </Stack>
                </Paper>
              ))}
            </Box>
          </Stack>
        ))}
      </Stack>

      <Stack spacing={1}>
        <Skeleton variant="text" width={140} height={48} />
        <Skeleton variant="text" width="70%" height={24} />
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

              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: "center", flexWrap: "wrap" }}
              >
                <Skeleton variant="rounded" width={96} height={24} />
                <Skeleton variant="rounded" width={132} height={24} />
              </Stack>

              <Stack spacing={0.75}>
                {Array.from({ length: 6 }).map((__, lineIdx) => (
                  <Skeleton
                    key={lineIdx}
                    variant="text"
                    width={`${86 - lineIdx * 4}%`}
                    height={22}
                  />
                ))}
              </Stack>

              <Skeleton variant="rectangular" height={1} />

              <Stack spacing={0.75} sx={{ flexGrow: 1 }}>
                <Skeleton variant="text" width="92%" height={22} />
                <Skeleton variant="text" width="76%" height={22} />
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
