import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBell, FaCommentDots, FaUserCircle } from "react-icons/fa";

const Details = () => {
  const navigate = useNavigate();

  // Editable State
  const [brand, setBrand] = useState("Tesla Model X");
  const [about, setAbout] = useState(
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."
  );
  const [specs, setSpecs] = useState({
    transmission: "Automatic",
    capacity: "5 Seats",
    carNumber: "PB23KE8273",
    status: "Available",
  });

  const handleSave = () => {
    alert("Changes saved!");
    // You can replace this with actual backend logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 font-sans relative">
      {/* Fixed Top Bar */}
      <div className="w-full bg-white px-6 py-4 flex justify-between items-center border-b fixed top-0 z-50 shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-blue-600 text-xl"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Unit Details</h1>
        </div>
        <div className="flex items-center space-x-6 text-gray-600 text-xl">
          <div className="relative">
            <FaCommentDots />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </div>
          <div className="relative">
            <FaBell />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </div>
          <FaUserCircle className="text-gray-700" />
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-28 pb-10 px-4 flex justify-center">
        <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-6 space-y-10">
          {/* Image Section */}
          <div>
            <p className="text-center text-sm text-gray-500 mb-3 font-medium">Main Car Image</p>
            <img
              src="/main.jpg"
              alt="Main Car"
              className="w-full h-64 object-cover rounded-xl shadow-sm"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {["/rear.jpg", "/front.jpg", "/side.jpg"].map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Angle ${idx}`}
                  className="w-full h-32 object-cover rounded-lg shadow"
                />
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
            {/* Car Info */}
            <div className="flex-1">
              <label className="text-sm text-gray-400">Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full text-2xl md:text-3xl font-bold text-blue-800 bg-transparent border-b border-gray-300 focus:outline-none mb-2"
              />

              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                5 Seats
              </span>

              <div className="mb-6">
                <label className="text-sm text-gray-400 font-semibold block mb-1">About</label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={4}
                  className="w-full text-sm text-gray-700 leading-relaxed p-3 border border-gray-300 rounded-lg focus:outline-none resize-none"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Specifications</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>
                    <span className="font-medium">Transmission: </span>
                    <input
                      value={specs.transmission}
                      onChange={(e) => setSpecs({ ...specs, transmission: e.target.value })}
                      className="ml-2 border-b border-gray-300 bg-transparent focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="font-medium">Capacity: </span>
                    <input
                      value={specs.capacity}
                      onChange={(e) => setSpecs({ ...specs, capacity: e.target.value })}
                      className="ml-2 border-b border-gray-300 bg-transparent focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="font-medium">Car Number: </span>
                    <input
                      value={specs.carNumber}
                      onChange={(e) => setSpecs({ ...specs, carNumber: e.target.value })}
                      className="ml-2 border-b border-gray-300 bg-transparent focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="font-medium">Status: </span>
                    <input
                      value={specs.status}
                      onChange={(e) => setSpecs({ ...specs, status: e.target.value })}
                      className={`ml-2 border-b border-gray-300 bg-transparent focus:outline-none ${
                        specs.status.toLowerCase() === "available" ? "text-green-600" : "text-red-600"
                      } font-semibold`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-start space-y-6 min-w-[200px]">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium shadow-md transition"
              >
                Save Changes
              </button>
              <div className="text-left">
                <div className="text-4xl font-bold text-gray-800">₱1500.00</div>
                <span className="text-sm text-gray-500">per day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
