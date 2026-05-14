import type { Guest } from "../../types/guest.types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useDeleteGuest } from "../../hooks/useDeleteGuest";
import { Alert, Button } from "@mui/material";
import { useGuestsStore } from "../../store/guests.store";
import { GuestItemInfoRow } from "./GuestItemInfoRow";
import { useAuthProvider } from "src/features/authProvider/hooks/useAuthProvider";

type GuestItemProps = {
  guest: Guest;
};

export default function GuestItem({ guest }: GuestItemProps) {
  const { handler, loading, error } = useDeleteGuest();
  const { setForm } = useGuestsStore();
  const { user } = useAuthProvider();
  const isReadOnly = Boolean(user?.readOnly);
  const statusColor =
    guest.status === "confirmed" ? "success" : guest.status === "declined" ? "error" : "default";
  const addressParts = [
    guest.address?.street,
    guest.address?.city,
    guest.address?.zipCode,
    guest.address?.country,
  ].filter(Boolean);

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
        sx={{ color: "primary.main", fontWeight: 700, width: "100%", textAlign: "center" }}
      >
        {guest.name} {guest.surname}
      </Typography>

      <Stack
        direction="row"
        spacing={0.75}
        sx={{ alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}
      >
        <Chip
          size="small"
          label={guest.status}
          color={statusColor as "success" | "error" | "default"}
          sx={{ textTransform: "capitalize", fontWeight: 600 }}
        />
        {guest.plusOneFullName && (
          <Chip
            size="small"
            variant="outlined"
            label={`+1 of ${guest.plusOneFullName}`}
            sx={{ fontWeight: 600 }}
          />
        )}
      </Stack>

      <Stack spacing={0.75}>
        <GuestItemInfoRow label="Side" value={guest.side} />
        <GuestItemInfoRow label="Group" value={guest.group} />
        <GuestItemInfoRow label="Stays overnight" value={guest.staysOvernight} />
        <GuestItemInfoRow label="Needs transport" value={guest.needsTransportation} />
        <GuestItemInfoRow label="Alcohol free" value={guest.alcoholFree} />
        <GuestItemInfoRow label="Dietary" value={guest.dietaryRestrictions} />
      </Stack>

      <Divider sx={{ my: 0.5 }} />

      <Stack spacing={0.75}>
        {guest.isChild && <GuestItemInfoRow label="Child" value="This guest is a child" />}
        {guest.email && guest.email.trim() && (
          <GuestItemInfoRow label="Email" value={guest.email} />
        )}
        {guest.phone && guest.phone.trim() && (
          <GuestItemInfoRow label="Phone" value={guest.phone} />
        )}
        {addressParts.length > 0 && (
          <GuestItemInfoRow label="Address" value={addressParts.join(", ")} />
        )}
        {guest.notes && guest.notes.trim() && (
          <GuestItemInfoRow label="Notes" value={guest.notes} />
        )}
      </Stack>

      {!isReadOnly && (
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
            onClick={() =>
              setForm({
                isOpen: true,
                guest: guest,
              })
            }
          ></Button>
        </Stack>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2, textAlign: "center", fontWeight: 600 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}
