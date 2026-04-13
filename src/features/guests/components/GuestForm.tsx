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
import { useState, useContext } from "react";
import { useCreateGuest } from "../hooks/useCreateGuest";
import type { Guest } from "../../../generated/prisma/client";
import type { CreateGuest } from "../types/guest.types";
import { GuestsContext } from "../context/GuestsContext";

type GuestFormProps = {
  open: boolean;
  onClose: () => void;
};

export default function GuestForm({ open, onClose }: GuestFormProps) {
  const [showAddress, setShowAddress] = useState(false);
  const [showDietary, setShowDietary] = useState(false);
  const guestsContext = useContext(GuestsContext);

  const initialGuestData: CreateGuest = {
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
  };

  const [newGuest, setNewGuest] = useState<CreateGuest>(initialGuestData);
  const { handler, loading, error } = useCreateGuest();

  const formFieldHandler = (key: keyof Guest, value: string | null) => {
    setNewGuest((g) => ({ ...g, [key]: value }));
  };

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const guestCreated: boolean = await handler(newGuest);
    if (guestCreated) {
      onClose();
      setNewGuest(initialGuestData);
      guestsContext?.setNewGuest(true);
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
            value={newGuest.name || ""}
            onChange={(e) => formFieldHandler("name", e.target.value)}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            className="mb-2 max-w-md w-full"
            value={newGuest.email || ""}
            onChange={(e) => formFieldHandler("email", e.target.value || null)}
          />
          <TextField
            label="Phone"
            name="phone"
            type="tel"
            className="mb-2 max-w-md w-full"
            value={newGuest.phone || ""}
            onChange={(e) => formFieldHandler("phone", e.target.value || null)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <FormControl required className="mb-2 max-w-md w-full">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              name="status"
              value={newGuest.status}
              onChange={(e) => formFieldHandler("status", e.target.value)}
            >
              <MenuItem value="not yet invited">Not yet invited</MenuItem>
              <MenuItem value="invited">Invited</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="declined">Declined</MenuItem>
            </Select>
          </FormControl>
          <FormControl required className="mb-2 max-w-md w-full">
            <InputLabel>Group</InputLabel>
            <Select
              label="Group"
              name="group"
              value={newGuest.group}
              onChange={(e) => formFieldHandler("group", e.target.value)}
            >
              <MenuItem value="family">Family</MenuItem>
              <MenuItem value="friends">Friends</MenuItem>
              <MenuItem value="coworkers">Coworkers</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl required className="mb-2 max-w-md w-full">
            <InputLabel>Plus One</InputLabel>
            <Select
              label="Plus One"
              name="plusOne"
              value={newGuest.plusOne}
              onChange={(e) => formFieldHandler("plusOne", e.target.value)}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="on the list">On the list</MenuItem>
              <MenuItem value="outside the list">Outside the list</MenuItem>
            </Select>
          </FormControl>
        </div>
        {newGuest.plusOne !== "none" && (
          <TextField
            label="Plus One Name"
            name="plusOneName"
            className="mb-2 max-w-md w-full"
            value={newGuest.plusOneName || ""}
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
                value={newGuest.addressCountry || ""}
                onChange={(e) =>
                  formFieldHandler("addressCountry", e.target.value || null)
                }
              />
              <TextField
                label="City"
                name="addressCity"
                className="max-w-md w-full"
                value={newGuest.addressCity || ""}
                onChange={(e) =>
                  formFieldHandler("addressCity", e.target.value || null)
                }
              />
              <TextField
                label="Street"
                name="addressStreet"
                className="max-w-md w-full"
                value={newGuest.addressStreet || ""}
                onChange={(e) =>
                  formFieldHandler("addressStreet", e.target.value || null)
                }
              />
              <TextField
                label="Zip Code"
                name="addressZipCode"
                className="max-w-md w-full"
                value={newGuest.addressZipCode || ""}
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
            <InputLabel>Dietary Restrictions</InputLabel>
            <Select
              label="Dietary Restrictions"
              name="dietaryRestrictions"
              value={newGuest.dietaryRestrictions || ""}
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
          value={newGuest.notes || ""}
          onChange={(e) => formFieldHandler("notes", e.target.value || null)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="mt-4 max-w-md w-full self-center"
          loading={loading}
          loadingPosition="end"
        >
          Create Guest
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
      </form>
    </Dialog>
  );
}
