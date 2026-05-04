import GuestList from "./components/GuestList";
import { Button, Box } from "@mui/material";
import GuestForm from "./components/GuestForm";
import PageHeader from "../../shared/ui/PageHeader";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useGuestsStore } from "./store/guests.store";
import ActionToast from "src/shared/ui/ActionToast";

export default function Guests() {
  const { guest, form, setForm } = useGuestsStore();

  return (
    <Box component="main">
      <ActionToast actionType={guest.actionType} category="guest" name={guest.guestName} />
      <PageHeader
        title="Guests"
        description="Track, edit, and organize everyone invited to your wedding."
      >
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() =>
            setForm({
              isOpen: true,
              guest: null,
            })
          }
          sx={{ width: "fit-content" }}
        >
          Add a new guest
        </Button>
      </PageHeader>
      <GuestList />
      <GuestForm key={form.guest?.id ?? "new-guest-form"} />
    </Box>
  );
}
