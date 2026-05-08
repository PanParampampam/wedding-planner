import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import {
  Autocomplete,
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
import type { CreateGuest, GuestPreferenceState, PlusOne } from "../types/guest.types";
import { useUpdateGuest } from "../hooks/useUpdateGuest";
import { useGuestsStore } from "../store/guests.store";

type GuestFormProps = {
  plusOneList: PlusOne[];
  allGuestsList: PlusOne[];
};

const DEFAULT_PREFERENCE_STATE: GuestPreferenceState = "not sure yet";

export default function GuestForm({ plusOneList, allGuestsList }: GuestFormProps) {
  const { form, setForm } = useGuestsStore();
  const [showAddress, setShowAddress] = useState(Boolean(form.guest?.address));
  const [showContact, setShowContact] = useState(Boolean(form.guest?.email || form.guest?.phone));
  const initialGuestData: CreateGuest | PrismaGuest = form.guest
    ? ({
        id: form.guest.id,
        name: form.guest.name,
        surname: form.guest.surname,
        plusOneId: form.guest.plusOneId ?? null,
        email: form.guest.email,
        phone: form.guest.phone,
        addressCountry: form.guest.address?.country || "",
        addressCity: form.guest.address?.city || "",
        addressStreet: form.guest.address?.street || "",
        addressZipCode: form.guest.address?.zipCode || "",
        status: form.guest.status,
        group: form.guest.group,
        side: form.guest.side,
        isChild: form.guest.isChild,
        staysOvernight: form.guest.staysOvernight ?? DEFAULT_PREFERENCE_STATE,
        needsTransportation: form.guest.needsTransportation ?? DEFAULT_PREFERENCE_STATE,
        alcoholFree: form.guest.alcoholFree ?? DEFAULT_PREFERENCE_STATE,
        dietaryRestrictions: form.guest.dietaryRestrictions ?? DEFAULT_PREFERENCE_STATE,
        notes: form.guest.notes,
      } as PrismaGuest)
    : ({
        name: "",
        surname: "",
        email: null,
        phone: null,
        addressCountry: null,
        addressCity: null,
        addressStreet: null,
        addressZipCode: null,
        status: "not yet invited",
        group: "family",
        side: "both",
        plusOneId: null,
        isChild: false,
        staysOvernight: DEFAULT_PREFERENCE_STATE,
        needsTransportation: DEFAULT_PREFERENCE_STATE,
        alcoholFree: DEFAULT_PREFERENCE_STATE,
        dietaryRestrictions: DEFAULT_PREFERENCE_STATE,
        notes: null,
      } as CreateGuest);

  const [guestData, setGuestData] = useState<typeof initialGuestData>(initialGuestData);

  const createGuestHook = useCreateGuest();
  const updateGuestHook = useUpdateGuest();

  const { loading, error } = form.guest ? updateGuestHook : createGuestHook;

  const formFieldHandler = (key: keyof PrismaGuest, value: string | number | boolean | null) => {
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
      setGuestData(initialGuestData);
      setForm({
        isOpen: false,
        guest: null,
      });
    }
  };

  const sideGradient =
    guestData.side === "groom"
      ? "var(--guest-form-gradient-groom)"
      : guestData.side === "bride"
        ? "var(--guest-form-gradient-bride)"
        : "var(--guest-form-gradient-both)";

  const selectablePlusOneList = plusOneList.filter(
    (plusOne) => !("id" in guestData) || plusOne.id !== guestData.id,
  );
  const selectedPlusOne =
    allGuestsList.find((plusOne) => plusOne.id === guestData.plusOneId) ?? null;
  const hasPlusOneOptions = selectablePlusOneList.length > 0;
  const isEditMode = Boolean(form.guest && form.guest.plusOneId);
  console.log(plusOneList);
  console.log(selectablePlusOneList);
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

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Name"
              name="name"
              required
              fullWidth
              value={guestData.name || ""}
              onChange={(e) => formFieldHandler("name", e.target.value)}
            />
            <TextField
              label="Surname"
              name="surname"
              required
              fullWidth
              value={guestData.surname || ""}
              onChange={(e) => formFieldHandler("surname", e.target.value)}
            />
          </Stack>

          <Autocomplete
            options={selectablePlusOneList}
            value={selectedPlusOne}
            disabled={isEditMode || !hasPlusOneOptions}
            getOptionLabel={(option) => option.fullName}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(_, option) => formFieldHandler("plusOneId", option?.id ?? null)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Plus One"
                helperText={
                  isEditMode
                    ? "You can't change already linked plus one. Edit or delete the plus one guest's info."
                    : hasPlusOneOptions
                      ? "Search and select an existing guest"
                      : "You don't have any guests to select from. You can link a plus one to this guest while creating."
                }
              />
            )}
          />

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

            <FormControl required fullWidth sx={{ background: sideGradient, borderRadius: 1 }}>
              <InputLabel id="side-select">Side</InputLabel>
              <Select
                id="side-select"
                label="Side"
                value={guestData.side}
                onChange={(e) => formFieldHandler("side", e.target.value)}
              >
                <MenuItem value="groom">Groom</MenuItem>
                <MenuItem value="bride">Bride</MenuItem>
                <MenuItem value="both">Both</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(guestData.isChild)}
                onChange={(e) => {
                  formFieldHandler("isChild", e.target.checked);
                  if (e.target.checked) formFieldHandler("alcoholFree", "yes");
                  else formFieldHandler("alcoholFree", DEFAULT_PREFERENCE_STATE);
                }}
                color="primary"
              />
            }
            label="Is guest a child?"
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="staysovernight-select">Stays overnight</InputLabel>
              <Select
                id="staysovernight-select"
                label="Stays overnight"
                value={guestData.staysOvernight}
                onChange={(e) =>
                  formFieldHandler("staysOvernight", e.target.value as GuestPreferenceState)
                }
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
                <MenuItem value="not sure yet">Not sure yet</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="needstransportation-select">Needs transportation</InputLabel>
              <Select
                id="needstransportation-select"
                label="Needs transportation"
                value={guestData.needsTransportation}
                onChange={(e) =>
                  formFieldHandler("needsTransportation", e.target.value as GuestPreferenceState)
                }
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
                <MenuItem value="not sure yet">Not sure yet</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="dietary-select">Dietary restrictions</InputLabel>
              <Select
                id="dietary-select"
                label="Dietary restrictions"
                value={guestData.dietaryRestrictions || "none"}
                onChange={(e) => formFieldHandler("dietaryRestrictions", e.target.value)}
              >
                <MenuItem value="not sure yet">Not sure yet</MenuItem>
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="vegetarian">Vegetarian</MenuItem>
                <MenuItem value="vegan">Vegan</MenuItem>
                <MenuItem value="gluten free">Gluten free</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth disabled={Boolean(guestData.isChild)}>
              <InputLabel id="alcoholfree-select">Alcohol free</InputLabel>
              <Select
                id="alcoholfree-select"
                label="Alcohol free"
                value={guestData.alcoholFree}
                onChange={(e) =>
                  formFieldHandler("alcoholFree", e.target.value as GuestPreferenceState)
                }
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
                <MenuItem value="not sure yet">Not sure yet</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <FormControlLabel
            control={
              <Checkbox
                checked={showContact}
                onChange={(e) => setShowContact(e.target.checked)}
                color="primary"
              />
            }
            label="Add the contact details"
          />

          {showContact && (
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
          )}

          <Typography sx={{ color: "text.secondary" }}>
            If you're intending to sent an invitation via mail, you can store the address of your
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
            label="Add an address"
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
