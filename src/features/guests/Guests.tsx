import GuestList from "./components/GuestList";
import { Button } from "@mui/material";
import GuestForm from "./components/GuestForm";
import { useState } from "react";
import { GuestsContext } from "./context/GuestsContext";
import type { Guest, GuestAction } from "./types/guest.types";
import ComponentHeader from "../../shared/ui/ComponentHeader";

export default function Guests() {
  const [guestFormOpen, setGuestFormOpen] = useState<boolean>(false);
  const [guestAction, setGuestAction] = useState<GuestAction>();
  const [editGuest, setEditGuest] = useState<Guest | undefined>(undefined);

  const openNewGuestForm = () => {
    setGuestFormOpen(true);
    setEditGuest(undefined);
  };

  const openEditGuestForm = (guest: Guest) => {
    setGuestFormOpen(true);
    setEditGuest(guest);
  };

  const handleFormClose = () => {
    setGuestFormOpen(false);
  };

  return (
    <GuestsContext value={{ guestAction, setGuestAction }}>
      <main>
        <ComponentHeader
          title="Guest List"
          description="Track, edit, and organize everyone invited to your wedding."
        >
          <Button
            variant="contained"
            onClick={openNewGuestForm}
            sx={{ width: "fit-content" }}
          >
            Add a new guest
          </Button>
        </ComponentHeader>
        <GuestList openEditGuestForm={openEditGuestForm} />
        <GuestForm
          open={guestFormOpen}
          onClose={handleFormClose}
          editGuest={editGuest}
          key={editGuest && editGuest.id}
        />
      </main>
    </GuestsContext>
  );
}
