import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useCreateGuest } from "../hooks/useCreateGuest";
import type { Guest as PrismaGuest } from "../../../generated/prisma/client";
import type { CreateGuest } from "../types/guest.types";
import { useUpdateGuest } from "../hooks/useUpdateGuest";
import { useGuestsStore } from "../store/guests.store";

export default function GuestForm() {
  const { form, setForm } = useGuestsStore();
  const [showAddress, setShowAddress] = useState(Boolean(form.guest?.address));
  const [showDietary, setShowDietary] = useState(Boolean(form.guest?.dietaryRestrictions));
  const initialGuestData: CreateGuest | PrismaGuest = form.guest
    ? ({
        id: form.guest.id,
        name: form.guest.name,
        email: form.guest.email,
        phone: form.guest.phone,
        addressCountry: form.guest.address?.country || "",
        addressCity: form.guest.address?.city || "",
        addressStreet: form.guest.address?.street || "",
        addressZipCode: form.guest.address?.zipCode || "",
        status: form.guest.status,
        group: form.guest.group,
        plusOne: form.guest.plusOne,
        plusOneName: form.guest.plusOneName,
        children: form.guest.children ?? null,
        dietaryRestrictions: form.guest.dietaryRestrictions,
        notes: form.guest.notes,
      } as PrismaGuest)
    : ({
        name: "",
        email: null,
        phone: null,
        addressCountry: null,
        addressCity: null,
        addressStreet: null,
        addressZipCode: null,
        status: "not yet invited",
        group: "family",
        plusOne: "none",
        plusOneName: null,
        children: null,
        dietaryRestrictions: null,
        notes: null,
      } as CreateGuest);

  const [guestData, setGuestData] = useState<typeof initialGuestData>(initialGuestData);

  const createGuestHook = useCreateGuest();
  const updateGuestHook = useUpdateGuest();

  const { loading, error } = form.guest ? updateGuestHook : createGuestHook;

  const formFieldHandler = (key: keyof PrismaGuest, value: string | number | null) => {
    setGuestData((g) => ({ ...g, [key]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let guestOperationResponse: boolean = false;
    if ("id" in guestData) {
      guestOperationResponse = await updateGuestHook.handler(guestData as PrismaGuest);
    } else {
      guestOperationResponse = await createGuestHook.handler(guestData as CreateGuest);
    }
    if (guestOperationResponse) {
      setForm({
        isOpen: false,
        guest: null,
      });
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={form.isOpen}
      onClose={() =>
        setForm({
          isOpen: false,
          guest: null,
        })
      }
    >
      <DialogTitle color="textPrimary" align="center">
        {form.guest ? "Edit guest" : "Add a new guest"}
      </DialogTitle>
      <DialogContent>
        <Stack component="form" spacing={2} sx={{ pt: 1 }} onSubmit={handleFormSubmit}>
          <Typography sx={{ color: "text.secondary" }}>
            Keep your guest list accurate and actionable so planning stays easy.
          </Typography>

          <TextField
            label="Name"
            name="name"
            required
            value={guestData.name || ""}
            onChange={(e) => formFieldHandler("name", e.target.value)}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={guestData.email || ""}
              onChange={(e) => formFieldHandler("email", e.target.value || null)}
            />
            <TextField
              label="Phone"
              name="phone"
              type="tel"
              fullWidth
              value={guestData.phone || ""}
              onChange={(e) => formFieldHandler("phone", e.target.value || null)}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl required fullWidth>
              <InputLabel id="status-select">Status</InputLabel>
              <Select
                id="status-select"
                label="Status"
                value={guestData.status}
                onChange={(e) => formFieldHandler("status", e.target.value)}
              >
                <MenuItem value="not yet invited">Not yet invited</MenuItem>
                <MenuItem value="invited">Invited</MenuItem>
                <MenuItem value="confirmed">Confirmed</MenuItem>
                <MenuItem value="declined">Declined</MenuItem>
              </Select>
            </FormControl>

            <FormControl required fullWidth>
              <InputLabel id="group-select">Group</InputLabel>
              <Select
                id="group-select"
                label="Group"
                value={guestData.group}
                onChange={(e) => formFieldHandler("group", e.target.value)}
              >
                <MenuItem value="family">Family</MenuItem>
                <MenuItem value="friends">Friends</MenuItem>
                <MenuItem value="coworkers">Coworkers</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl required fullWidth>
              <InputLabel id="plusone-select">Plus One</InputLabel>
              <Select
                id="plusone-select"
                label="Plus One"
                value={guestData.plusOne}
                onChange={(e) => formFieldHandler("plusOne", e.target.value)}
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="on the list">On the list</MenuItem>
                <MenuItem value="outside the list">Outside the list</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Children"
              type="number"
              fullWidth
              value={guestData.children ?? ""}
              onChange={(e) =>
                formFieldHandler("children", e.target.value === "" ? null : Number(e.target.value))
              }
              slotProps={{ htmlInput: { min: 0 } }}
            />
          </Stack>

          {guestData.plusOne !== "none" && (
            <TextField
              label="Plus One Name"
              name="plusOneName"
              value={guestData.plusOneName || ""}
              onChange={(e) => formFieldHandler("plusOneName", e.target.value || null)}
            />
          )}
          <Typography sx={{ color: "text.secondary" }}>
            If your guest is having some a specific diet (like vegan or no gluten), you can select
            it here.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={showDietary}
                onChange={(e) => setShowDietary(e.target.checked)}
                color="primary"
              />
            }
            label="Add dietary restrictions"
          />

          {showDietary && (
            <FormControl fullWidth>
              <InputLabel id="dietary-select">Dietary Restrictions</InputLabel>
              <Select
                id="dietary-select"
                label="Dietary Restrictions"
                value={guestData.dietaryRestrictions || ""}
                onChange={(e) => formFieldHandler("dietaryRestrictions", e.target.value || null)}
              >
                <MenuItem value="vegetarian">Vegetarian</MenuItem>
                <MenuItem value="vegan">Vegan</MenuItem>
                <MenuItem value="gluten free">Gluten Free</MenuItem>
              </Select>
            </FormControl>
          )}
          <Typography sx={{ color: "text.secondary" }}>
            If you're intending to sent an invitation via email, you can store the address of your
            guest.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={showAddress}
                onChange={(e) => setShowAddress(e.target.checked)}
                color="primary"
              />
            }
            label="Add address"
          />

          {showAddress && (
            <Stack spacing={2}>
              <Typography variant="subtitle1">Address</Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Country"
                  fullWidth
                  value={guestData.addressCountry || ""}
                  onChange={(e) => formFieldHandler("addressCountry", e.target.value || null)}
                />
                <TextField
                  label="City"
                  fullWidth
                  value={guestData.addressCity || ""}
                  onChange={(e) => formFieldHandler("addressCity", e.target.value || null)}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Street"
                  fullWidth
                  value={guestData.addressStreet || ""}
                  onChange={(e) => formFieldHandler("addressStreet", e.target.value || null)}
                />
                <TextField
                  label="Zip Code"
                  fullWidth
                  value={guestData.addressZipCode || ""}
                  onChange={(e) => formFieldHandler("addressZipCode", e.target.value || null)}
                />
              </Stack>
            </Stack>
          )}

          <TextField
            label="Notes"
            name="notes"
            multiline
            minRows={2}
            value={guestData.notes || ""}
            onChange={(e) => formFieldHandler("notes", e.target.value || null)}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            loading={loading}
            loadingPosition="end"
            endIcon={form.guest ? <SaveRoundedIcon /> : <AddRoundedIcon />}
            sx={{ width: "fit-content", alignSelf: "flex-end" }}
          >
            {form.guest ? "Save changes" : "Create guest"}
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
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
