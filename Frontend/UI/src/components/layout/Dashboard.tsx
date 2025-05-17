import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);

  const toggleSidebarMobile = () => {
    setSidebarMobileOpen(!sidebarMobileOpen);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebarMobile}
        />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        "md:hidden fixed inset-y-0 left-0 transform z-30 transition duration-300 ease-in-out",
        sidebarMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Sidebar />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="md:ml-64 min-h-screen flex flex-col">
        <Navbar toggleSidebarMobile={toggleSidebarMobile} />
        <main className="flex-1 p-6 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;