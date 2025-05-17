import React, { useState } from 'react';
import { Bell, Search, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

interface NavbarProps {
  toggleSidebarMobile: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebarMobile }) => {
  const { user, logout, role, setRole } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    if (notificationsOpen) setNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (userMenuOpen) setUserMenuOpen(false);
  };

  const switchRole = () => {
    setRole(role === 'admin' ? 'mentor' : 'admin');
    setUserMenuOpen(false);
  };

  return (
    <div className="fixed top-0 right-0 left-0 bg-white shadow-sm z-10 ml-0 md:ml-64 transition-all duration-300">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebarMobile}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 md:hidden"
          >
            <Menu size={20} />
          </button>
          <div className="relative ml-4 hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input 
              type="search" 
              placeholder="Search..." 
              className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              onClick={toggleNotifications}
              className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">3</span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">New session request</p>
                      <p className="text-xs text-gray-500 mt-1">
                        A new mentoring session has been requested for tomorrow.
                      </p>
                      <p className="text-xs text-gray-400 mt-1">10 min ago</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={toggleUserMenu}
              className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {user?.avatar ? (
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={user.avatar}
                  alt={user.name}
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                  <User size={18} />
                </div>
              )}
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button 
                  onClick={switchRole} 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Switch to {role === 'admin' ? 'Mentor' : 'Admin'}
                </button>
                <button 
                  onClick={logout} 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;