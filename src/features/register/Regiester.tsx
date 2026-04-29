import {
  Alert,
  Box,
  Button,
  Divider,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import { useState } from "react";
import type { Dayjs } from "dayjs";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import type { RegisterForm } from "./types/register.types";
import { useCreateUser } from "./hooks/useCreateUser";
import { useFormValidate } from "./hooks/useFormValidate";

const initialForm: RegisterForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  weddingDate: null,
};

export default function Register() {
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const { formErrors, setFormErrors, validate } = useFormValidate();
  const { loading, error, handler } = useCreateUser();
  const navigate = useNavigate();

  const handleChange =
    (field: keyof RegisterForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(form)) return;
    if (!form.weddingDate) return;

    const newUser = {
      name: form.name,
      email: form.email,
      password: form.password,
      weddingDate: form.weddingDate.toISOString(),
    };
    const userCreated = await handler(newUser);
    if (userCreated) {
      navigate("/login", {
        replace: true,
        state: {
          message: `Account for ${newUser.name} has been created. You can now log in.`,
        },
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
              Create an account
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Sign up to start planning your wedding.
            </Typography>
          </Stack>

          <Divider sx={{ borderColor: "divider" }} />

          {/* Form */}
          <Stack
            component="form"
            onSubmit={handleFormSubmit}
            spacing={2.5}
            noValidate
          >
            <TextField
              label="Name"
              value={form.name}
              onChange={handleChange("name")}
              error={!!formErrors.name}
              helperText={formErrors.name}
              autoComplete="name"
              fullWidth
            />

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

            <DatePicker
              label="Wedding Date"
              format="DD/MM/YYYY"
              value={form.weddingDate}
              onChange={(date: Dayjs | null) => {
                setForm((prev) => ({
                  ...prev,
                  weddingDate: date,
                }));
                setFormErrors((prev) => ({ ...prev, weddingDate: undefined }));
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!formErrors.weddingDate,
                  helperText:
                    typeof formErrors.weddingDate === "string"
                      ? formErrors.weddingDate
                      : undefined,
                },
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange("password")}
              error={!!formErrors.password}
              helperText={formErrors.password ?? "Minimum 8 characters."}
              autoComplete="new-password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        type="button"
                        size="small"
                        onClick={() => setShowPassword((prev) => !prev)}
                        sx={{ minWidth: 0, px: 0.5 }}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputAdornment>
                  ),
                },
              }}
              fullWidth
            />

            <TextField
              label="Confirm password"
              type={showPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              autoComplete="new-password"
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
              endIcon={<AppRegistrationRoundedIcon />}
              sx={{ mt: 0.5, py: 1.25 }}
            >
              Create an account
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
              Already have an account?{" "}
              <Link component={RouterLink} to="/login" underline="hover">
                Login here
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
