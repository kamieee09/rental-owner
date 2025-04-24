import React, { useState } from "react";
import { Star } from "@mui/icons-material";
import { CalendarCheck2, Car, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [bookings] = useState([
    { id: 1, name: "Liam Johnson", unit: "Honda City 2021", date: "November 27, 2025", status: "Pending" },
    { id: 2, name: "Sophia Martinez", unit: "Toyota Corolla 2020", date: "November 15, 2025", status: "Completed" },
    { id: 3, name: "Emma Watson", unit: "Nissan Altima 2019", date: "November 10, 2025", status: "Cancelled" },
  ]);

  const reviewsData = [
    { id: 1, car: "Toyota Grandia 2017", user: "Liam Johnson", rating: 5, review: "Great service Zkyrie’s Car Rental. Easy transactions and highly recommend here to everybody who want to rent a car for family vacation." },
    { id: 2, car: "Toyota Vios 2024", user: "Emma Watsons", rating: 5, review: "Smooth process, car was in excellent condition." },
    { id: 3, car: "GAC M8 Master", user: "John Doe", rating: 4, review: "Smooth process, car was in excellent condition." }
  ];

  const [reviews] = useState(reviewsData);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8 space-y-8 min-h-screen bg-gradient-to-br from-gray-100 to-white">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Car Rental System</h1>
        <p className="text-sm text-gray-500">Overview of rental activity and statistics</p>
      </div>

      {/* Dashboard Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "New Booking", value: "1", icon: <CalendarCheck2 />, route: "/bookings", bg: "from-gray-500 to-gray-700" },
          { label: "No. of Cars", value: "6", icon: <Car />, route: "/units", bg: "from-gray-500 to-gray-700" },
          { label: "No. of Clients", value: "10", icon: <Users />, route: "/clients", bg: "from-gray-500 to-gray-700" },
        ].map((card, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl text-white shadow-lg cursor-pointer bg-gradient-to-tr ${card.bg} hover:scale-105 transition-transform duration-200 flex items-center justify-between`}
            onClick={() => navigate(card.route)}
          >
            <div>
              <h3 className="text-4xl font-bold">{card.value}</h3>
              <p className="text-sm opacity-90">{card.label}</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-full">
              {React.cloneElement(card.icon, { className: "w-8 h-8" })}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Clients Table */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Recent Clients</h2>
          <button
            onClick={() => navigate('/clients')}
            className="text-sm text-blue-600 hover:underline"
          >
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 font-semibold">
                <th className="px-4 py-3">Client Name</th>
                <th className="px-4 py-3">Car Unit</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(({ id, name, unit, date, status }) => (
                <tr key={id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{name}</td>
                  <td className="px-4 py-3 text-gray-600">{unit}</td>
                  <td className="px-4 py-3 text-gray-600">{date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(status)}`}>
                      {status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Feedbacks */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Clients Feedback</h2>
          <button
            onClick={() => navigate('/feedbacks')}
            className="text-sm text-blue-600 hover:underline"
          >
            View All
          </button>
        </div>
        <ul className="space-y-4">
          {reviews.map(({ id, user, car, rating, review }) => (
            <li key={id} className="border-b pb-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-700">{user}</p>
                <div className="flex text-yellow-500">
                  {Array(rating).fill().map((_, i) => <Star key={i} fontSize="small" />)}
                </div>
              </div>
              <p className="text-sm text-gray-600 italic">{car}</p>
              <p className="text-gray-500 mt-1">{review}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
