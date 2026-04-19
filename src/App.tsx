import {
  Box,
  CssBaseline,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import Budget from "./features/budget/Budget";
import Guests from "./features/guests/Guests";
import Nav from "./features/nav/Nav";
import { DRAWER_WIDTH } from "./shared/constants/componentsSizes";

function Home() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Stack spacing={1.5}>
        <Typography
          variant="h4"
          sx={{ textAlign: "left", color: "primary.main", fontWeight: 700 }}
        >
          Welcome to your Wedding Planner
        </Typography>
        <Typography sx={{ textAlign: "left", color: "text.secondary" }}>
          Keep your guest list, budget, and wedding details organized in one
          place.
        </Typography>
      </Stack>
    </Paper>
  );
}

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <CssBaseline />
      <Nav />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar sx={{ display: { xs: "flex", md: "none" } }} />

        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/guests" element={<Guests />} />
            <Route path="/budget" element={<Budget />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
