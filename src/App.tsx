import { Box, CssBaseline, Toolbar } from "@mui/material";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { useAuthProvider } from "./features/authProvider/hooks/useAuthProvider";
import LoadingLayout from "./shared/layouts/LoadingLayout";

function App() {
  const { user, authLoading } = useAuthProvider();

  if (authLoading) {
    return <LoadingLayout />;
  }

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
