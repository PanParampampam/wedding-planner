import { useEffect, useState } from "react";
import { getGuests } from "../api/guests.api";
import type { Guest } from "../types/guest.types";
import { useGuestsStore } from "../store/guests.store";

export const useGuests = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { guest } = useGuestsStore();

  useEffect(() => {
    setLoading(true);
    const getGuestsHandler = async () => {
      try {
        const guestsResponse = await getGuests();
        const guestsData: Guest[] = guestsResponse.map((guest) => ({
          id: guest.id,
          name: guest.name,
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
          plusOne: guest.plusOne as Guest["plusOne"],
          plusOneName: guest.plusOneName,
          dietaryRestrictions: guest.dietaryRestrictions as Guest["dietaryRestrictions"],
          notes: guest.notes,
        }));
        setGuests(guestsData);
      } catch (e) {
        console.error("getGuestsHandler error: ", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getGuestsHandler();
  }, [guest.guestId]);

  return { guests, loading, error };
};
