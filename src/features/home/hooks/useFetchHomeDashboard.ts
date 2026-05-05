import { useEffect, useState } from "react";
import { getHomeDashboard } from "../home.api";
import type { HomeDashboardData } from "../home.api";

export const useFetchHomeDashboard = () => {
  const [home, setHome] = useState<HomeDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchHomeDashboard = async () => {
    setLoading(true);
    try {
      const homeDashboardResponse = await getHomeDashboard();
      setError(false);
      setHome(homeDashboardResponse);
    } catch (e) {
      console.error("getGuestsHandler error: ", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeDashboard();
  }, []);

  return { home, loading, error };
};
