import { Box, CssBaseline } from "@mui/material";
import { useLocation } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { useAuthProvider } from "./features/authProvider/hooks/useAuthProvider";
import LoadingLayout from "./shared/layouts/LoadingLayout";

function App() {
  const { user, authLoading } = useAuthProvider();
  const { pathname } = useLocation();

  const isPublicAuthPath = pathname === "/login" || pathname === "/register";

  if (authLoading && !isPublicAuthPath) {
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
    </Box>
  );
}

export default App;
