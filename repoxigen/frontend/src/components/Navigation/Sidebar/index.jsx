import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  LogOut,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Briefcase,
  Users
} from 'lucide-react';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const userRole = user?.role || 'user'; 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };


  const userMenuItems = [
    { path: '/dashboard/user', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/dashboard/agenda', name: 'Agenda UKM', icon: <CalendarDays size={20} /> },
  ];

  const adminDivisiMenuItems = [
    { path: '/dashboard/admin', name: 'Dashboard Admin', icon: <LayoutDashboard size={20} />, end: true },
    { path: '/dashboard/admin/agenda', name: 'Manajemen Agenda', icon: <ClipboardList size={20} /> },
  ];
  const adminInternalMenuItems = [
    { path: '/dashboard/internal', name: 'Dashboard Internal', icon: <LayoutDashboard size={20} /> },
    { path: '/dashboard/internal/akun', name: 'Manage Akun', icon: <Users size={20} /> },
    { path: '/dashboard/internal/rapat', name: 'Rapat Internal', icon: <Briefcase size={20} /> },
  ];


  let menuItems = userMenuItems;
  let panelLabel = 'Member Area';

  if (userRole === 'admin_divisi') {
    menuItems = adminDivisiMenuItems;
    panelLabel = 'Divisi Panel';
  } else if (userRole === 'admin_hum_in') {
    menuItems = adminInternalMenuItems;
    panelLabel = 'Internal Panel';
  }

  return (
    <aside
      className={`
        hidden md:flex flex-col h-screen bg-oxigen-dark text-white 
        transition-all duration-300 ease-in-out shadow-xl z-50 fixed left-0 top-0
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >

      <div className="h-20 flex items-center justify-between px-4 border-b border-white/10">
        {!isCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <div className="w-8 h-8 bg-oxigen-light rounded-lg flex items-center justify-center font-bold text-white">
              OX
            </div>
            <span className="font-bold text-xl tracking-wide">OXIGEN</span>
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className={`
            p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors
            ${isCollapsed ? 'mx-auto' : ''}
          `}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>


      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">

        {!isCollapsed && (
          <div className="px-3 mb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
            {panelLabel}
          </div>
        )}

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative
              ${isActive
                ? 'bg-gradient-to-r from-oxigen-light to-blue-600 text-white shadow-lg shadow-blue-900/50'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'}
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <div className={`${isCollapsed ? '' : 'group-hover:scale-110 transition-transform'}`}>
              {item.icon}
            </div>

            {!isCollapsed && (
              <span className="font-medium text-sm whitespace-nowrap overflow-hidden">
                {item.name}
              </span>
            )}

            {isCollapsed && (
              <div className="absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {item.name}
              </div>
            )}
          </NavLink>
        ))}
      </nav>


      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 
            hover:bg-red-500/10 hover:text-red-300 transition-all duration-300
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="font-medium text-sm">Keluar</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;