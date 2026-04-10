import type { Guest } from "../types/guest.types";

export default function GuestItem(guest: Guest) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col gap-2 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="font-semibold text-lg text-gray-800">{guest.name}</div>
      {guest.email && (
        <div className="text-gray-500 text-sm">{guest.email}</div>
      )}
      {guest.status && (
        <span
          className={`inline-block px-2 py-1 rounded text-xs font-medium ${guest.status === "confirmed" ? "bg-green-100 text-green-700" : guest.status === "declined" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`}
        >
          {guest.status}
        </span>
      )}
    </div>
  );
}
