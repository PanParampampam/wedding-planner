import type { Guest } from "../types/guest.types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useDeleteGuest } from "../hooks/useDeleteGuest";
import { Alert, Button } from "@mui/material";
import { useGuestsStore } from "../store/guests.store";
import { GuestItemInfoRow } from "./GuestItemInfoRow";

type GuestItemProps = {
  guest: Guest;
};

const sideGradient = (side: Guest["side"]): string => {
  if (side === "groom") return "var(--guest-form-gradient-groom)";
  if (side === "bride") return "var(--guest-form-gradient-bride)";
  return "var(--guest-form-gradient-both)";
};

export default function GuestItem({ guest }: GuestItemProps) {
  const { handler, loading, error } = useDeleteGuest();
  const { setForm } = useGuestsStore();
  console.log(guest);
  const statusColor =
    guest.status === "confirmed" ? "success" : guest.status === "declined" ? "error" : "default";

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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: { xs: "stretch", lg: "flex-start" },
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "primary.main", fontWeight: 700, width: { xs: "100%", lg: "auto" } }}
        >
          {guest.name} {guest.surname}
        </Typography>
        <Stack
          direction="row"
          spacing={0.75}
          sx={{
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: { xs: "flex-start", lg: "flex-end" },
            width: { xs: "100%", lg: "auto" },
          }}
        >
          <Chip
            size="small"
            label={guest.status}
            color={statusColor as "success" | "error" | "default"}
            sx={{ textTransform: "capitalize", fontWeight: 600 }}
          />
          {guest.isChild && <Chip label="Child" size="small" color="info" />}
          <Box
            sx={{
              px: 1.5,
              py: 0.25,
              borderRadius: 2,
              background: sideGradient(guest.side),
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "capitalize",
              color: "text.secondary",
              whiteSpace: "nowrap",
            }}
          >
            {guest.side}
          </Box>
        </Stack>
      </Box>

      <Stack spacing={0.75}>
        <GuestItemInfoRow label="Group" value={guest.group} />
        <GuestItemInfoRow label="Stays overnight" value={guest.staysOvernight} />
        <GuestItemInfoRow label="Needs transport" value={guest.needsTransportation} />
        <GuestItemInfoRow label="Alcohol free" value={guest.alcoholFree} />
        <GuestItemInfoRow label="Dietary" value={guest.dietaryRestrictions} />
      </Stack>

      <Divider sx={{ my: 0.5 }} />

      {/* Contact & address details */}
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
          onClick={() =>
            setForm({
              isOpen: true,
              guest: guest,
            })
          }
        ></Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mt: 2, textAlign: "center", fontWeight: 600 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}
