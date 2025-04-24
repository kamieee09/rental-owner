import React, { useState } from "react";
import { Edit3, Trash2, Plus, Search, X } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const unitsData = [
  { id: 1, unitName: "Tesla Model X", brand: "Tesla", carNumber: "PB23KE8273", transmission: "Automatic", capacity: "5 Seats", price: "P1500.00", status: "Available" },
  { id: 2, unitName: "Nissan Leaf", brand: "Nissan", carNumber: "MH56EH937", transmission: "Automatic", capacity: "5 Seats", price: "P1800.00", status: "Available" },
  { id: 3, unitName: "Yamaha YZF-R6", brand: "Yamaha", carNumber: "UK23KE8273", transmission: "Manual", capacity: "2 Seats", price: "P1500.00", status: "Booked" },
];

const Units = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [units, setUnits] = useState(unitsData);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const [newCar, setNewCar] = useState({
    unitName: "",
    brand: "",
    carNumber: "",
    transmission: "",
    capacity: "",
    price: "",
    status: "Available",
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setUnits(units.filter((unit) => unit.id !== id));
        Swal.fire("Deleted!", "The unit has been deleted.", "success");
      }
    });
  };

  const handleAddCar = () => {
    const { unitName, brand, carNumber, transmission, capacity, price } = newCar;

    if (!unitName || !brand || !carNumber || !transmission || !capacity || !price) {
      setFormError("Please fill out all fields.");
      return;
    }

    setUnits([...units, { ...newCar, id: units.length + 1 }]);
    setShowForm(false);
    setNewCar({ unitName: "", brand: "", carNumber: "", transmission: "", capacity: "", price: "", status: "Available" });
    setFormError("");
  };

  const handleEdit = (id) => {
    navigate(`/details/${id}`);
  };

  const filteredUnits = searchTerm
    ? units.filter((unit) => unit.unitName.toLowerCase().includes(searchTerm.toLowerCase()))
    : units;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-2">Manage Units</h2>
      <p className="text-gray-500 mb-5">Here you can view, add, edit, and delete available units for rental.</p>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center border border-gray-300 rounded-lg px-2">
          <Search className="text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by Car Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 py-2 focus:outline-none"
          />
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center"
        >
          <Plus className="mr-2 w-4 h-4" />
          Add List
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add New Car</h2>
              <button onClick={() => setShowForm(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <input type="text" placeholder="Unit Name" value={newCar.unitName} onChange={(e) => setNewCar({ ...newCar, unitName: e.target.value })} className="w-full mb-2 p-2 border rounded" />
            <input type="text" placeholder="Brand" value={newCar.brand} onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })} className="w-full mb-2 p-2 border rounded" />
            <input type="text" placeholder="Car Number" value={newCar.carNumber} onChange={(e) => setNewCar({ ...newCar, carNumber: e.target.value })} className="w-full mb-2 p-2 border rounded" />
            <input type="text" placeholder="Transmission" value={newCar.transmission} onChange={(e) => setNewCar({ ...newCar, transmission: e.target.value })} className="w-full mb-2 p-2 border rounded" />
            <input type="text" placeholder="Capacity" value={newCar.capacity} onChange={(e) => setNewCar({ ...newCar, capacity: e.target.value })} className="w-full mb-2 p-2 border rounded" />
            <input type="text" placeholder="Price" value={newCar.price} onChange={(e) => setNewCar({ ...newCar, price: e.target.value })} className="w-full mb-2 p-2 border rounded" />
            
            {formError && (
              <p className="text-red-500 text-sm mb-2">{formError}</p>
            )}

            <button onClick={handleAddCar} className="bg-gray-600 text-white px-4 py-2 rounded w-full">
              Add Car
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">No.</th>
              <th className="py-2 px-4 border-b text-left">Unit Name</th>
              <th className="py-2 px-4 border-b text-left">Brand</th>
              <th className="py-2 px-4 border-b text-left">Car Number</th>
              <th className="py-2 px-4 border-b text-left">Transmission</th>
              <th className="py-2 px-4 border-b text-left">Capacity</th>
              <th className="py-2 px-4 border-b text-left">Price</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUnits.map((unit) => (
              <tr key={unit.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-left">{unit.id}</td>
                <td className="py-2 px-4 border-b text-left">{unit.unitName}</td>
                <td className="py-2 px-4 border-b text-left">{unit.brand}</td>
                <td className="py-2 px-4 border-b text-left">{unit.carNumber}</td>
                <td className="py-2 px-4 border-b text-left">{unit.transmission}</td>
                <td className="py-2 px-4 border-b text-left">{unit.capacity}</td>
                <td className="py-2 px-4 border-b text-left">{unit.price}</td>
                <td className="py-2 px-4 border-b text-left">{unit.status}</td>
                <td className="py-2 px-4 border-b text-left">
                  <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => handleEdit(unit.id)}>
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(unit.id)}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Units;
