import GuestList from "./components/GuestList";
import { Button } from "@mui/material";
import GuestForm from "./components/GuestForm";
import { useState } from "react";
import { GuestsContext } from "./context/GuestsContext";

export default function Guests() {
  const [guestFormOpen, setGuestFormOpen] = useState<boolean>(false);
  const [newGuest, setNewGuest] = useState<boolean>(false);

  const handleGuestFormOpen = () => {
    setGuestFormOpen(true);
  };

  const handleGuestFormClose = () => {
    setGuestFormOpen(false);
  };
  return (
    <GuestsContext value={{ newGuest, setNewGuest }}>
      <main>
        <Button variant="contained" onClick={handleGuestFormOpen}>
          Add a new guest
        </Button>
        <GuestList />
        <GuestForm open={guestFormOpen} onClose={handleGuestFormClose} />
      </main>
    </GuestsContext>
  );
}
