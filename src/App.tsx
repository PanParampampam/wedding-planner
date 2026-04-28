import { Box, CssBaseline, Toolbar } from "@mui/material";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { useAuthProvider } from "./features/authProvider/hooks/useAuthProvider";

function App() {
  const { user } = useAuthProvider();
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      {user ? <ProtectedRoutes /> : <PublicRoutes />}
      <CssBaseline />
      <Toolbar sx={{ display: { xs: "flex", md: "none" } }} />
    </Box>
  );
}

export default App;
