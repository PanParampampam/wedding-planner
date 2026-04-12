import GuestList from "./components/GuestList";
import { Button } from "@mui/material";
import GuestForm from "./components/GuestForm";
import { useState } from "react";

export default function Guests() {
  const [guestFormOpen, setGuestFormOpen] = useState<boolean>(false);

  const handleGuestFormOpen = () => {
    setGuestFormOpen(true);
  };

  const handleGuestFormClose = () => {
    setGuestFormOpen(false);
  };
  return (
    <main>
      <Button variant="contained" onClick={handleGuestFormOpen}>
        Add a new guest
      </Button>
      <GuestList />
      <GuestForm open={guestFormOpen} onClose={handleGuestFormClose} />
    </main>
  );
}
