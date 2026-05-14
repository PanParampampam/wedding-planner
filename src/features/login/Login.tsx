import {
  Alert,
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import type { LoginForm } from "./types/login.types";
import { useFormValidate } from "./hooks/useFormValidate";
import { useLogin } from "./hooks/useLogin";
import type { Login } from "src/shared/types/common.types";
import { useAuthProvider } from "../authProvider/hooks/useAuthProvider";
import { demoLogin } from "./api/login.api";

const initialForm: LoginForm = {
  email: "",
  password: "",
};

export default function Login() {
  const [form, setForm] = useState<LoginForm>(initialForm);
  const [demoLoading, setDemoLoading] = useState<boolean>(false);
  const [demoError, setDemoError] = useState<string>("");
  const { formErrors, setFormErrors, validate } = useFormValidate();
  const { loading, error, handler } = useLogin();
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuthProvider();
  const userCreatedMessage = (location.state as { message?: string } | null)?.message;

  const handleChange = (field: keyof LoginForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDemoError("");

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

  const handleDemoLogin = async () => {
    setDemoError("");
    setDemoLoading(true);

    try {
      const response = await demoLogin();

      if (!response.success || !response.user) {
        throw new Error(response.message ?? "Could not start demo mode.");
      }

      login({
        name: response.user.name,
        email: response.user.email,
        weddingDate: response.user.weddingDate,
        budget: response.user.budget,
        currencyCode: response.user.currencyCode,
        readOnly: response.user.readOnly,
        isDemo: response.user.isDemo,
      });

      navigate("/home", {
        replace: true,
      });
    } catch (e) {
      setDemoError(e instanceof Error ? e.message : String(e));
    } finally {
      setDemoLoading(false);
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
            <Typography variant="h4" sx={{ color: "primary.main", fontWeight: 700 }}>
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
            autoComplete="on"
            noValidate
          >
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              error={!!formErrors.email}
              helperText={formErrors.email}
              autoComplete="username"
              fullWidth
            />

            <TextField
              id="password"
              name="password"
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
              loading={loading}
              loadingPosition="end"
              endIcon={<LoginRoundedIcon />}
              sx={{ mt: 0.5, py: 1.25 }}
            >
              Sign in
            </Button>

            <Button
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              loading={demoLoading}
              disabled={loading}
              loadingPosition="end"
              endIcon={<VisibilityRoundedIcon />}
              sx={{ py: 1.25 }}
              onClick={handleDemoLogin}
            >
              Check the demo
            </Button>

            {(error || demoError) && (
              <Alert
                severity="error"
                sx={{
                  mt: 2,
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {error || demoError}
              </Alert>
            )}
            <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center" }}>
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
