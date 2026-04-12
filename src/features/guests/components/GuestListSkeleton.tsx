import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

export default function GuestListSkeleton() {
  return (
    <Box sx={{ maxWidth: { xs: "100%", lg: 1200 }, marginX: "auto", mt: 8 }}>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Guest List</h2>
      <Grid container spacing={3}>
        {[...Array(6)].map((_, idx) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={idx}>
            <Box
              sx={{
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
                p: 3,
                border: 1,
                borderColor: "grey.200",
                minHeight: 220,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
              <Skeleton
                variant="rectangular"
                width="50%"
                height={24}
                sx={{ mb: 1 }}
              />
              <Skeleton
                variant="rectangular"
                width="80%"
                height={18}
                sx={{ mb: 1 }}
              />
              <Skeleton
                variant="rectangular"
                width="90%"
                height={18}
                sx={{ mb: 1 }}
              />
              <Skeleton
                variant="rectangular"
                width="70%"
                height={18}
                sx={{ mb: 1 }}
              />
              <Skeleton variant="rectangular" width="40%" height={18} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
