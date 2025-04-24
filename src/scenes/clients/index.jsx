import { useState } from "react";
import { Search } from "@mui/icons-material";
import { HiAdjustments } from "react-icons/hi";
import { FiTrash2 } from "react-icons/fi";

const Clients = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: "Liam Johnson",
      email: "lj@gmail.com",
      unit: "Honda City 2021",
      date: "November 27, 2025",
      status: "Pending",
    },
    {
      id: 2,
      name: "John Doe",
      email: "jd@gmail.com",
      unit: "Honda City 2021",
      date: "November 15, 2025",
      status: "Cancelled",
    },
    {
      id: 3,
      name: "Emma Watsons",
      email: "ew@gmail.com",
      unit: "Honda City 2021",
      date: "November 13, 2025",
      status: "Booked",
    },
  ]);

  const handleDelete = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.id.toString().includes(search) ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.unit.toLowerCase().includes(search.toLowerCase()) ||
      b.date.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "Cancelled":
        return "text-red-600";
      case "Booked":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Completed":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Title and Subtitle */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Client Bookings</h2>
        <p className="text-gray-600">Manage your clients and view their booking details below.</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 max-w-6xl mx-auto">
        {/* Search */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/2 bg-white">
          <Search className="text-gray-400 mr-2 text-base" />
          <input
            type="text"
            placeholder="Search by Car Name"
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/4 bg-white">
          <HiAdjustments className="text-gray-400 mr-2 text-base" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700 text-sm"
          >
            <option value="All">All Statuses</option>
            <option value="Booked">Booked</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-gray-600 text-sm uppercase bg-gray-50">
            <tr>
              <th className="py-3 px-4">Booking ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Unit</th>
              <th className="py-3 px-4">Booked Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="border-b">
                <td className="py-3 px-4">{booking.id}</td>
                <td className="py-3 px-4">{booking.name}</td>
                <td className="py-3 px-4">{booking.email}</td>
                <td className="py-3 px-4">{booking.unit}</td>
                <td className="py-3 px-4">{booking.date}</td>
                <td className="py-3 px-4">
                  <span className={`${getStatusStyle(booking.status)} font-medium`}>
                    {booking.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <FiTrash2
                    className="text-red-500 hover:text-red-700 cursor-pointer text-lg"
                    onClick={() => handleDelete(booking.id)}
                  />
                </td>
              </tr>
            ))}
            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500 italic">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;
