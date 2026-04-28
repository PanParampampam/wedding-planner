import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import logo from "./../../assets/logo.png";

export default function LoadingLayout() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
          backgroundColor: "#FEFEFE",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Wedding Planner logo"
          sx={{ height: 300, width: "auto" }}
        />
      </Box>

      <Stack
        sx={{
          alignItems: "center",
          gap: 2,
          mt: 8,
        }}
      >
        <CircularProgress
          size={48}
          thickness={3}
          sx={{ color: "primary.main" }}
        />
        <Typography
          variant="h6"
          sx={{ color: "text.primary", fontStyle: "italic" }}
        >
          Setting up your planner...
        </Typography>
      </Stack>
    </Box>
  );
}
