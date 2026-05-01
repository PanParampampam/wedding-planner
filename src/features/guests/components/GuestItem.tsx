import type { Guest } from "../types/guest.types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useDeleteGuest } from "../hooks/useDeleteGuest";
import { Alert, Button } from "@mui/material";

export default function GuestItem({
  guest,
  openEditGuestForm,
}: {
  guest: Guest;
  openEditGuestForm: (guest: Guest) => void;
}) {
  const { handler, loading, error } = useDeleteGuest();

  const summaryItems = [
    {
      label: "Status",
      value: guest.status || "Pending",
      valueColor:
        guest.status === "confirmed"
          ? "success.main"
          : guest.status === "declined"
            ? "error.main"
            : "text.secondary",
    },
    {
      label: "Group",
      value: guest.group || "Not set",
      valueColor: "primary.main",
    },
    {
      label: "Plus One",
      value: guest.plusOne ? "Yes" : "No",
      valueColor: "text.primary",
    },
    {
      label: "Dietary",
      value: guest.dietaryRestrictions || "None",
      valueColor: "text.primary",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
        p: 3,
        border: 1,
        borderColor: "divider",
        minHeight: 220,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: 4 },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "primary.main",
          textAlign: "center",
          fontWeight: 700,
        }}
      >
        {guest.name}
      </Typography>

      <Grid container spacing={1.25}>
        {summaryItems.map((item) => (
          <Grid size={{ xs: 6 }} key={item.label}>
            <Paper
              variant="outlined"
              sx={{
                p: 1.25,
                height: "100%",
                bgcolor: "grey.50",
                borderColor: "grey.200",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 0.5,
                  color: "text.secondary",
                  fontWeight: 700,
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </Typography>
              <Typography variant="body2" sx={{ color: item.valueColor, fontWeight: 600 }}>
                {String(item.value)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ my: 1 }} />

      <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
        {guest.email && guest.email.trim() && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
              Email:
            </Box>{" "}
            {guest.email}
          </Typography>
        )}
        {guest.phone && guest.phone.trim() && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
              Phone:
            </Box>{" "}
            {guest.phone}
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
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
                  Address:
                </Box>{" "}
                {addressParts.join(", ")}
              </Typography>
            ) : null;
          })()}
        {guest.plusOneName && guest.plusOneName.trim() && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
              Plus One Name:
            </Box>{" "}
            {guest.plusOneName}
          </Typography>
        )}
        {guest.notes && guest.notes.trim() && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
              Notes:
            </Box>{" "}
            {guest.notes}
          </Typography>
        )}
      </Stack>

      <Stack
        direction="row"
        spacing={1.5}
        sx={{ mt: "auto", pt: 2, justifyContent: "space-between" }}
      >
        <Button
          variant="text"
          sx={{ width: "fit-content" }}
          color="error"
          loading={loading}
          endIcon={<DeleteOutlineRoundedIcon />}
          onClick={() => handler(guest.id)}
        ></Button>
        <Button
          variant="text"
          sx={{ width: "fit-content" }}
          loading={loading}
          endIcon={<EditRoundedIcon />}
          onClick={() => openEditGuestForm(guest)}
        ></Button>
      </Stack>

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
    </Box>
  );
}
