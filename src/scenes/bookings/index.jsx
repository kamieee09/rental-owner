import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaRegCommentDots } from "react-icons/fa";
import Calendar from "react-calendar"

const initialBookings = [
  {
    id: 1,
    client: "Liam Johnson",
    email: "liamjohnson@gmail.com",
    phone: "0917-123-4567",
    car: "Honda City 2021",
    pickup: "November 14, 2025",
    return: "November 16, 2025",
    pickupLocation: "Makati City",
    returnLocation: "Quezon City",
    status: "pending",
  },
  {
    id: 2,
    client: "Emma Watson",
    email: "emmawatson@gmail.com",
    phone: "0918-888-9999",
    car: "Toyota Corolla 2023",
    pickup: "December 1, 2025",
    return: "December 5, 2025",
    pickupLocation: "Pasig City",
    returnLocation: "Taguig City",
    status: "pending",
  },
  {
    id: 3,
    client: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0906-555-1234",
    car: "Ford Mustang 2024",
    pickup: "January 10, 2026",
    return: "January 15, 2026",
    pickupLocation: "Cebu City",
    returnLocation: "Cebu City",
    status: "pending",
  },
];

const Bookings = () => {
  const [bookings, setBookings] = useState(initialBookings);

  const handleStatusChange = (id, newStatus) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: newStatus } : b
    );
    setBookings(updated);
  };

  const getStatusTag = (status) => {
    switch (status) {
      case "pending":
        return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">Pending</span>;
      case "accepted":
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Accepted</span>;
      case "rejected":
        return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          Booking Management
          <span className="text-base font-normal text-gray-500">| Pending Approvals</span>
        </h2>
        <p className="text-sm text-gray-500">
          Review, accept, or cancel vehicle rental bookings
        </p>
      </div>

      {/* Booking Cards */}
      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {booking.client} - <span className="text-sm text-gray-500">{booking.car}</span>
                </h3>
                <p className="text-sm text-gray-500">{booking.email}</p>
              </div>
              {getStatusTag(booking.status)}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <p>
                <strong>Pickup:</strong> {booking.pickup} - {booking.pickupLocation}
              </p>
              <p>
                <strong>Return:</strong> {booking.return} - {booking.returnLocation}
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium ${
                  booking.status !== "pending"
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
                onClick={() => handleStatusChange(booking.id, "accepted")}
                disabled={booking.status !== "pending"}
              >
                <FaCheckCircle /> Accept
              </button>

              <button
                className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium ${
                  booking.status !== "pending"
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
                onClick={() => handleStatusChange(booking.id, "rejected")}
                disabled={booking.status !== "pending"}
              >
                <FaTimesCircle /> Cancel
              </button>

              <button className="flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200">
                <FaRegCommentDots /> Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
