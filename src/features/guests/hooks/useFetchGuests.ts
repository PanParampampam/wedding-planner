import { useEffect, useState } from "react";
import { getGuests } from "../api/guests.api";
import type { Guest } from "../types/guest.types";
import { useGuestsStore } from "../store/guests.store";

export const useFetchGuests = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { guest } = useGuestsStore();

  const fetchGuests = async () => {
    setLoading(true);
    try {
      const guestsResponse = await getGuests();
      const guestFullNamesById = new Map(
        guestsResponse.map((guest) => [guest.id, `${guest.name} ${guest.surname}`.trim()]),
      );

      const guestsData: Guest[] = guestsResponse.map((guest) => ({
        id: guest.id,
        name: guest.name,
        surname: guest.surname,
        side: guest.side as Guest["side"],
        isChild: guest.isChild,
        alcoholFree: guest.alcoholFree as Guest["alcoholFree"],
        staysOvernight: guest.staysOvernight as Guest["staysOvernight"],
        needsTransportation: guest.needsTransportation as Guest["needsTransportation"],
        email: guest.email,
        phone: guest.phone,
        address: {
          country: guest.addressCountry,
          city: guest.addressCity,
          street: guest.addressStreet,
          zipCode: guest.addressZipCode,
        },
        status: guest.status as Guest["status"],
        group: guest.group as Guest["group"],
        plusOneId: guest.plusOneId,
        plusOneFullName: guest.plusOneId ? (guestFullNamesById.get(guest.plusOneId) ?? null) : null,
        dietaryRestrictions: guest.dietaryRestrictions as Guest["dietaryRestrictions"],
        notes: guest.notes,
      }));
      setGuests(guestsData);
      setError(false);
    } catch (e) {
      console.error("getGuestsHandler error: ", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  useEffect(() => {
    if (!guest.guestId) return;
    fetchGuests();
  }, [guest.guestId]);

  return { guests, loading, error };
};
