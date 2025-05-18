import React from 'react';
import { FaStar, FaCog } from 'react-icons/fa';

const BottomNavigation = ({ active = "trending", onNavigate }) => (
  <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center h-14 z-50">
    <button
      className={`flex flex-col items-center flex-1 py-2 ${active === "trending" ? "text-blue-600" : "text-gray-400"}`}
      onClick={() => onNavigate("trending")}
    >
      <FaStar size={20} />
      <span className="text-xs mt-1">Trending</span>
    </button>
    <button
      className={`flex flex-col items-center flex-1 py-2 ${active === "settings" ? "text-blue-600" : "text-gray-400"}`}
      onClick={() => onNavigate("settings")}
    >
      <FaCog size={20} />
      <span className="text-xs mt-1">Settings</span>
    </button>
  </nav>
);

export default BottomNavigation;
