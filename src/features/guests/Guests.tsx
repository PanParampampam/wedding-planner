import GuestList from "./components/GuestList";
import { Button } from "@mui/material";
import GuestForm from "./components/GuestForm";
import { useState } from "react";
import { GuestsContext } from "./context/GuestsContext";
import type { Guest, GuestAction } from "./types/guest.types";

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
        <Button variant="contained" onClick={openNewGuestForm}>
          Add a new guest
        </Button>
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
