import GuestsDashboard from "./components/GuestsDashboard";
import { Button, Box } from "@mui/material";
import GuestForm from "./components/GuestForm";
import PageHeader from "../../shared/ui/PageHeader";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useGuestsStore } from "./store/guests.store";
import ActionToast from "src/shared/ui/ActionToast";

export default function Guests() {
  const { guest, setGuest, form, setForm } = useGuestsStore();

  return (
    <Box>
      <ActionToast
        actionType={guest.actionType}
        category="guest"
        name={guest.guestName}
        onDismiss={() =>
          setGuest({
            actionType: null,
            guestId: "",
            guestName: "",
          })
        }
      />
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
      <GuestsDashboard />
      <GuestForm key={form.guest?.id} />
    </Box>
  );
}
