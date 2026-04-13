import type { Guest } from "../types/guest.types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { useDeleteGuest } from "../hooks/useDeleteGuest";
import { Alert, Button } from "@mui/material";

export default function GuestItem(guest: Guest) {
  const { handler, loading, error } = useDeleteGuest();
  return (
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
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: 4 },
      }}
    >
      <Typography variant="h6" color="text.primary">
        {guest.name}
      </Typography>
      <Grid container spacing={1}>
        <Grid size={{ xs: 6 }}>
          <Chip
            label={guest.group}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Chip
            label={guest.status}
            size="small"
            color={
              guest.status === "confirmed"
                ? "success"
                : guest.status === "declined"
                  ? "error"
                  : "default"
            }
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Chip
            label={`Plus One: ${guest.plusOne}`}
            size="small"
            variant="outlined"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          {guest.dietaryRestrictions && (
            <Chip
              label={guest.dietaryRestrictions}
              size="small"
              color="secondary"
              sx={{ width: "100%" }}
            />
          )}
        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Stack spacing={0.5}>
        {guest.email && guest.email.trim() && (
          <Typography variant="body2" color="text.secondary">
            <strong>Email:</strong> {guest.email}
          </Typography>
        )}
        {guest.phone && guest.phone.trim() && (
          <Typography variant="body2" color="text.secondary">
            <strong>Phone:</strong> {guest.phone}
          </Typography>
        )}
        {guest.address &&
          (() => {
            const addressParts = [
              guest.address.street,
              guest.address.city,
              guest.address.zipCode,
              guest.address.country,
            ].filter(Boolean);
            return addressParts.length > 0 ? (
              <Typography variant="body2" color="text.secondary">
                <strong>Address:</strong> {addressParts.join(", ")}
              </Typography>
            ) : null;
          })()}
        {guest.plusOneName && guest.plusOneName.trim() && (
          <Typography variant="body2" color="text.secondary">
            <strong>Plus One Name:</strong> {guest.plusOneName}
          </Typography>
        )}
        {guest.notes && guest.notes.trim() && (
          <Typography variant="body2" color="text.secondary">
            <strong>Notes:</strong> {guest.notes}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handler(guest.id)}
          className="mt-4 max-w-md w-full self-center"
          loading={loading}
          loadingPosition="end"
        >
          Delete Guest
        </Button>
        {error && (
          <Alert
            severity="error"
            sx={{
              mt: 2,
              bgcolor: "error.main",
              color: "common.white",
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            {error}
          </Alert>
        )}
      </Stack>
    </Box>
  );
}
