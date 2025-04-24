import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import TopbarOwner from "./scenes/global/TopbarOwner";
import SidebarOwner from "./scenes/global/SidebarOwner";
import Dashboard from "./scenes/dashboard";
import Bookings from "./scenes/bookings";
import Units from "./scenes/units";
import Clients from "./scenes/clients";
import Feedbacks from "./scenes/feedbacks/indes.jsx";
import Messages from "./scenes/messages";
import Report from "./scenes/report";
import Profile from "./components/profile/index.jsx";
import Details from "./components/udetails/index.jsx";
import Login from "./scenes/login/index.jsx";

const pageTitles = {
  "/": "Dashboard Overview",
  "/bookings": "Bookings",
  "/units": "Units",
  "/clients": "Clients",
  "/feedbacks": "Feedback and Reviews",
  "/messages": "Messages",
  "/report": "Car Reports",
  "/udetails": "Unit Details",
};

function App() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Dashboard Overview");

  useEffect(() => {
    setPageTitle(pageTitles[location.pathname] || "Dashboard Overview");
  }, [location.pathname]);

  return (
    <div className="flex h-screen">
      <SidebarOwner />
      <main className="flex-grow overflow-auto">
        {/* Hide TopbarOwner on Unit Details page */}
        {!location.pathname.startsWith("/details/") && (
          <TopbarOwner pageTitle={pageTitle} />
        )}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/units" element={<Units />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/feedbacks" element={<Feedbacks />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/report" element={<Report />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/logout" element={<Login />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
