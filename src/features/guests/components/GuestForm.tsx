import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useCreateGuest } from "../hooks/useCreateGuest";
import type { Guest } from "../types/guest.types";
import type { Guest as PrismaGuest } from "../../../generated/prisma/client";
import type { CreateGuest } from "../types/guest.types";
import { useUpdateGuest } from "../hooks/useUpdateGuest";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

type GuestFormProps = {
  open: boolean;
  onClose: () => void;
  editGuest: Guest | undefined;
};

export default function GuestForm({
  open,
  onClose,
  editGuest,
}: GuestFormProps) {
  const [showAddress, setShowAddress] = useState(false);
  const [showDietary, setShowDietary] = useState(false);

  const initialGuestData: CreateGuest | PrismaGuest = editGuest
    ? ({
        id: editGuest.id,
        name: editGuest.name,
        email: editGuest.email,
        phone: editGuest.phone,
        addressCountry: editGuest.address?.country || "",
        addressCity: editGuest.address?.city || "",
        addressStreet: editGuest.address?.street || "",
        addressZipCode: editGuest.address?.zipCode || "",
        status: editGuest.status,
        group: editGuest.group,
        plusOne: editGuest.plusOne,
        plusOneName: editGuest.plusOneName,
        dietaryRestrictions: editGuest.dietaryRestrictions,
        notes: editGuest.notes,
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
        dietaryRestrictions: null,
        notes: null,
      } as CreateGuest);

  const [guestData, setGuestData] =
    useState<typeof initialGuestData>(initialGuestData);

  const createGuestHook = useCreateGuest();
  const updateGuestHook = useUpdateGuest();

  const { loading, error } = editGuest ? updateGuestHook : createGuestHook;

  const formFieldHandler = (key: keyof PrismaGuest, value: string | null) => {
    setGuestData((g) => ({ ...g, [key]: value }));
  };

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    let guestOperationResponse: boolean = false;
    if ("id" in guestData) {
      guestOperationResponse = await updateGuestHook.handler(
        guestData as PrismaGuest,
      );
    } else {
      guestOperationResponse = await createGuestHook.handler(
        guestData as CreateGuest,
      );
    }
    if (guestOperationResponse) {
      onClose();
      setGuestData(initialGuestData);
    }
  };

  return (
    <Dialog fullWidth={true} maxWidth={"sm"} onClose={onClose} open={open}>
      <form
        className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg flex flex-col gap-4"
        onSubmit={handleFormSubmit}
      >
        <DialogTitle className="text-2xl font-bold mb-2 !text-gray-900">
          Add a new guest
        </DialogTitle>
        <div className="flex flex-col items-center gap-4">
          <TextField
            label="Name"
            name="name"
            required
            className="mb-2 max-w-md w-full"
            value={guestData.name || ""}
            onChange={(e) => formFieldHandler("name", e.target.value)}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            className="mb-2 max-w-md w-full"
            value={guestData.email || ""}
            onChange={(e) => formFieldHandler("email", e.target.value || null)}
          />
          <TextField
            label="Phone"
            name="phone"
            type="tel"
            className="mb-2 max-w-md w-full"
            value={guestData.phone || ""}
            onChange={(e) => formFieldHandler("phone", e.target.value || null)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <FormControl required className="mb-2 max-w-md w-full">
            <InputLabel htmlFor="status-select">Status</InputLabel>
            <Select
              id="status-select"
              label="Status"
              aria-label="status"
              name="status"
              value={guestData.status}
              onChange={(e) => formFieldHandler("status", e.target.value)}
            >
              <MenuItem value="not yet invited">Not yet invited</MenuItem>
              <MenuItem value="invited">Invited</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="declined">Declined</MenuItem>
            </Select>
          </FormControl>
          <FormControl required className="mb-2 max-w-md w-full">
            <InputLabel htmlFor="group-select">Group</InputLabel>
            <Select
              id="group-select"
              label="Group"
              aria-label="group"
              name="group"
              value={guestData.group}
              onChange={(e) => formFieldHandler("group", e.target.value)}
            >
              <MenuItem value="family">Family</MenuItem>
              <MenuItem value="friends">Friends</MenuItem>
              <MenuItem value="coworkers">Coworkers</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl required className="mb-2 max-w-md w-full">
            <InputLabel htmlFor="plusone-select">Plus One</InputLabel>
            <Select
              id="plusone-select"
              label="Plus One"
              aria-label="plus one"
              name="plusOne"
              value={guestData.plusOne}
              onChange={(e) => formFieldHandler("plusOne", e.target.value)}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="on the list">On the list</MenuItem>
              <MenuItem value="outside the list">Outside the list</MenuItem>
            </Select>
          </FormControl>
        </div>
        {guestData.plusOne !== "none" && (
          <TextField
            label="Plus One Name"
            name="plusOneName"
            className="mb-2 max-w-md w-full"
            value={guestData.plusOneName || ""}
            onChange={(e) =>
              formFieldHandler("plusOneName", e.target.value || null)
            }
          />
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={showAddress}
              onChange={(e) => setShowAddress(e.target.checked)}
              color="primary"
            />
          }
          label="Add Address"
          className="max-w-md w-full"
        />
        {showAddress && (
          <>
            <Typography variant="subtitle1" className="mt-2">
              Address
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <TextField
                label="Country"
                name="addressCountry"
                className="max-w-md w-full"
                value={guestData.addressCountry || ""}
                onChange={(e) =>
                  formFieldHandler("addressCountry", e.target.value || null)
                }
              />
              <TextField
                label="City"
                name="addressCity"
                className="max-w-md w-full"
                value={guestData.addressCity || ""}
                onChange={(e) =>
                  formFieldHandler("addressCity", e.target.value || null)
                }
              />
              <TextField
                label="Street"
                name="addressStreet"
                className="max-w-md w-full"
                value={guestData.addressStreet || ""}
                onChange={(e) =>
                  formFieldHandler("addressStreet", e.target.value || null)
                }
              />
              <TextField
                label="Zip Code"
                name="addressZipCode"
                className="max-w-md w-full"
                value={guestData.addressZipCode || ""}
                onChange={(e) =>
                  formFieldHandler("addressZipCode", e.target.value || null)
                }
              />
            </div>
          </>
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={showDietary}
              onChange={(e) => setShowDietary(e.target.checked)}
              color="primary"
            />
          }
          label="Add Dietary Restrictions"
          className="max-w-md w-full"
        />
        {showDietary && (
          <FormControl className="mb-2 max-w-md w-full">
            <InputLabel htmlFor="dietary-select">
              Dietary Restrictions
            </InputLabel>
            <Select
              id="dietary-select"
              label="Dietary Restrictions"
              name="dietaryRestrictions"
              value={guestData.dietaryRestrictions || ""}
              onChange={(e) =>
                formFieldHandler("dietaryRestrictions", e.target.value || null)
              }
            >
              <MenuItem value="vegetarian">Vegetarian</MenuItem>
              <MenuItem value="vegan">Vegan</MenuItem>
              <MenuItem value="gluten free">Gluten Free</MenuItem>
            </Select>
          </FormControl>
        )}
        <TextField
          label="Notes"
          name="notes"
          multiline
          minRows={2}
          className="mb-2 max-w-md w-full"
          value={guestData.notes || ""}
          onChange={(e) => formFieldHandler("notes", e.target.value || null)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="mt-4 max-w-md w-full self-center"
          loading={loading}
          loadingPosition="end"
          endIcon={editGuest ? <EditRoundedIcon /> : <SaveRoundedIcon />}
        >
          {editGuest ? "Edit guest" : "New guest"}
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
      </form>
    </Dialog>
  );
}
