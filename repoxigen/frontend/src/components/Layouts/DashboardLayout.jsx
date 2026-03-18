import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Navigation/Sidebar';
import MobileNav from '../Navigation/MobileNav';

const DashboardLayout = () => {
  // State untuk kontrol Sidebar (Expanded/Collapsed)
  // Default: Expanded di Desktop
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* 1. SIDEBAR (Hanya muncul di Desktop/Tablet) */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />

      {/* 2. MAIN CONTENT AREA */}
      <main 
        className={`
          flex-1 p-6 md:p-8 pb-32 md:pb-8 transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} 
        `}
      >
        {/* Kita hapus Header User di pojok kanan atas sesuai request */}
        
        {/* Render Halaman Dashboard disini */}
        <div className="max-w-7xl mx-auto animate-fade-in-up">
          <Outlet />
        </div>
      </main>

      {/* 3. MOBILE NAVBAR (Hanya muncul di Mobile) */}
      <MobileNav />

    </div>
  );
};

export default DashboardLayout;