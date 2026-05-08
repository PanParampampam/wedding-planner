import { useFetchGuests } from "../hooks/useFetchGuests";
import GuestListSkeleton from "./GuestsDashboardSkeleton";
import { Stack } from "@mui/material";
import { guestsStatsHandler } from "../utils/guestsStatsHandler";
import GuestsStats from "./GuestsStats/GuestsStats";
import GuestsOverview from "./GuestsOverview/GuestsOverview";
import GuestForm from "./GuestForm";
import { useGuestsStore } from "../store/guests.store";
import type { PlusOne } from "../types/guest.types";
import GuestList from "./GuestList/GuestList";

export default function GuestsDashboard() {
  const { guests, loading, error } = useFetchGuests();
  const { form } = useGuestsStore();
  const {
    totalGuests,
    totalEstimated,
    notYetInvited,
    invited,
    confirmed,
    declined,
    children,
    groupCounts,
    dietaryCounts,
    staysOvernightCounts,
    needsTransportCounts,
    alcoholFreeCounts,
    side,
  } = guestsStatsHandler(guests);

  const allGuestsList: PlusOne[] = guests.map((guest) => ({
    id: guest.id,
    fullName: `${guest.name} ${guest.surname}`,
  }));

  const plusOneList: PlusOne[] = guests
    .filter((guest) => !guest.plusOneId)
    .map((guest) => {
      return {
        id: guest.id,
        fullName: `${guest.name} ${guest.surname}`,
      };
    });

  const sortedGuests = guests.sort((a, b) => {
    const surnameA = a.surname.toLowerCase();
    const surnameB = b.surname.toLowerCase();

    if (surnameA > surnameB) {
      return 1;
    }

    if (surnameA < surnameB) {
      return -1;
    }

    return 0;
  });

  if (loading) {
    return <GuestListSkeleton />;
  }
  if (error) {
    return <div className="text-center py-8 text-red-500">Failed to load guests.</div>;
  }

  return (
    <>
      <Stack spacing={2}>
        <GuestsOverview
          totalGuests={totalGuests}
          totalEstimated={totalEstimated}
          notYetInvited={notYetInvited}
          invited={invited}
          confirmed={confirmed}
          declined={declined}
          children={children}
        />
        <GuestsStats
          groupCounts={groupCounts}
          dietaryCounts={dietaryCounts}
          staysOvernightCounts={staysOvernightCounts}
          needsTransportCounts={needsTransportCounts}
          alcoholFreeCounts={alcoholFreeCounts}
          side={side}
        />
        <GuestList guests={sortedGuests} />
      </Stack>
      <GuestForm key={form.guest?.id} plusOneList={plusOneList} allGuestsList={allGuestsList} />
    </>
  );
}
