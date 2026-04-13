import GuestList from "./components/GuestList";
import { Button } from "@mui/material";
import GuestForm from "./components/GuestForm";
import { useState } from "react";
import { GuestsContext } from "./context/GuestsContext";
import type { GuestAction } from "./types/guest.types";

export default function Guests() {
  const [guestFormOpen, setGuestFormOpen] = useState<boolean>(false);
  const [guestAction, setGuestAction] = useState<GuestAction>();

  const handleGuestFormOpen = () => {
    setGuestFormOpen(true);
  };

  const handleGuestFormClose = () => {
    setGuestFormOpen(false);
  };
  return (
    <GuestsContext value={{ guestAction, setGuestAction }}>
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
