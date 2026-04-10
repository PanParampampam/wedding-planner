import { useEffect, useState } from "react";
import { getGuests } from "../api/guests.api";

export const useGuests = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getGuestsHandler = async () => {
      const result = await getGuests();
      console.log("result: ", result);
      setGuests(result);
      setLoading(false);
    };
    getGuestsHandler();
  }, []);

  return { guests, loading, error };
};
