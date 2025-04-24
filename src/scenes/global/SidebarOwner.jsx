import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Car,
  Users,
  MessageCircle,
  BarChart3,
  LogOut,
} from "lucide-react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { ClipLoader } from "react-spinners"; // npm install react-spinners

const SidebarOwner = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, to: "/" },
    { label: "Bookings", icon: <ClipboardList size={20} />, to: "/bookings" },
    { label: "Units", icon: <Car size={20} />, to: "/units" },
    { label: "Clients", icon: <Users size={20} />, to: "/clients" },
    { label: "Feedbacks", icon: <MessageCircle size={20} />, to: "/feedbacks" },
    { label: "Car Reports", icon: <BarChart3 size={20} />, to: "/report" },
  ];

  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      setLoading(true);
      setTimeout(() => {
        navigate(path);
        setLoading(false);
      }, 500);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear session/token if used
    setLoading(true);
    setTimeout(() => {
      navigate("/login"); // Redirect to login page
      setLoading(false);
    }, 500);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      )}

      <div className="relative h-screen flex">
        <div
          className={`bg-[#111827] text-white flex flex-col transition-all duration-300 ease-in-out ${
            isCollapsed ? "w-[80px]" : "w-[260px]"
          }`}
        >
          <div className="flex items-center justify-center p-4">
            <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center font-bold text-lg">
              🚗
            </div>
            {!isCollapsed && (
              <span className="ml-2 text-lg font-semibold whitespace-nowrap">
                Car Rental System
              </span>
            )}
          </div>

          <nav className="flex-1 mt-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <div
                  key={item.label}
                  onClick={() => handleNavigation(item.to)}
                  className={`flex items-center gap-3 px-4 py-2 mx-2 my-1 rounded-md transition-all duration-200 cursor-pointer
                    ${
                      isActive
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                >
                  <div className="text-xl">{item.icon}</div>
                  <span
                    className={`text-sm font-medium transition-all duration-200 ${
                      isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </nav>

          {/* Logout */}
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 mx-2 mb-4 rounded-md cursor-pointer transition-all duration-200 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="text-sm font-medium">Log Out</span>}
          </div>
        </div>

        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-gray-800 border border-gray-600 w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-gray-700 transition-colors z-10"
        >
          {isCollapsed ? (
            <HiChevronRight className="text-white text-lg" />
          ) : (
            <HiChevronLeft className="text-white text-lg" />
          )}
        </button>
      </div>
    </>
  );
};

export default SidebarOwner;
