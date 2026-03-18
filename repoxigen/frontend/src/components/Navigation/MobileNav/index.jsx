import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, LogOut } from 'lucide-react';

const MobileNav = () => {
  const menuItems = [
    { path: '/dashboard/user', name: 'Home', icon: <LayoutDashboard size={22} /> },
    { path: '/dashboard/agenda', name: 'Agenda UKM', icon: <CalendarDays size={20} /> },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
      <div className="bg-oxigen-dark/90 backdrop-blur-md border border-white/10 rounded-full px-6 py-4 shadow-2xl flex justify-between items-center">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              p-2 rounded-full transition-all duration-300 relative group
              ${isActive ? 'text-white bg-oxigen-light shadow-lg shadow-blue-500/30 -translate-y-2' : 'text-gray-400 hover:text-white'}
            `}
          >
            {item.icon}
          </NavLink>
        ))}

        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }}
          className="p-2 rounded-full text-red-400 hover:bg-red-500/20 transition-colors"
        >
          <LogOut size={22} />
        </button>
      </div>
    </div>
  );
};

export default MobileNav;