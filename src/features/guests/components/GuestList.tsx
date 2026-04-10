import GuestItem from "./GuestItem";
import { useGuests } from "../hooks/useGuests";

export default function GuestList() {
  //const { guests, isLoading, error } = useGuests();
  const { guests, loading, error } = useGuests();

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500">Loading guests...</div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load guests.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Guest List</h2>
      <div className="flex flex-col gap-4">
        {guests && guests.length > 0 ? (
          guests.map((guest) => <GuestItem key={guest.id} {...guest} />)
        ) : (
          <div className="text-gray-500 text-center">No guests found.</div>
        )}
      </div>
    </div>
  );
}
