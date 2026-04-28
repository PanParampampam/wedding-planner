import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import type { LoginForm } from "./types/login.types";
import { useFormValidate } from "./hooks/useFormValidate";
import { useLogin } from "./hooks/useLogin";
import type { Login } from "src/shared/types/common.types";
import { useAuthProvider } from "../authProvider/hooks/useAuthProvider";

const initialForm: LoginForm = {
  email: "",
  password: "",
};

export default function Login() {
  const [form, setForm] = useState<LoginForm>(initialForm);
  const { formErrors, setFormErrors, validate } = useFormValidate();
  const { loading, error, handler } = useLogin();
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuthProvider();
  const userCreatedMessage = (location.state as { message?: string } | null)
    ?.message;

  const handleChange =
    (field: keyof LoginForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate(form)) return;
    const user: Login = {
      email: form.email,
      password: form.password,
    };
    const loggedInUser = await handler(user);
    if (loggedInUser) {
      login(loggedInUser);
      navigate("/home", {
        replace: true,
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 440,
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Stack spacing={3}>
          {/* Header */}
          <Stack spacing={0.5}>
            <Typography
              variant="h4"
              sx={{ color: "primary.main", fontWeight: 700 }}
            >
              Sign in
            </Typography>
            {userCreatedMessage ? (
              <Alert severity="success">{userCreatedMessage}</Alert>
            ) : (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Welcome back! Sign in to your account.
              </Typography>
            )}
          </Stack>
          <Divider sx={{ borderColor: "divider" }} />

          {/* Form */}
          <Stack
            component="form"
            onSubmit={handleSubmit}
            spacing={2.5}
            noValidate
          >
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              error={!!formErrors.email}
              helperText={formErrors.email}
              autoComplete="email"
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              value={form.password}
              onChange={handleChange("password")}
              error={!!formErrors.password}
              helperText={formErrors.password}
              autoComplete="current-password"
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={loading}
              sx={{ mt: 0.5, py: 1.25 }}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Sign in"
              )}
            </Button>
            {error && (
              <Alert
                severity="error"
                sx={{
                  mt: 2,
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {error}
              </Alert>
            )}
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", textAlign: "center" }}
            >
              Don&apos;t have an account yet?{" "}
              <Link component={RouterLink} to="/register" underline="hover">
                Register here
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
