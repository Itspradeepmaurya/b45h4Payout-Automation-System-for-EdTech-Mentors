import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';
import { NavItem } from '../../types';
import { 
  LayoutDashboard, 
  Calendar, 
  Receipt, 
  MessageSquare, 
  FileText, 
  Settings, 
  Users, 
  BarChart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    roles: ['admin', 'mentor']
  },
  {
    title: 'Sessions',
    href: '/sessions',
    icon: Calendar,
    roles: ['admin', 'mentor']
  },
  {
    title: 'Receipts',
    href: '/receipts',
    icon: Receipt,
    roles: ['admin', 'mentor']
  },
  {
    title: 'Chat',
    href: '/chat',
    icon: MessageSquare,
    roles: ['admin', 'mentor']
  },
  {
    title: 'Logs',
    href: '/logs',
    icon: FileText,
    roles: ['admin', 'mentor']
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart,
    roles: ['admin']
  },
  {
    title: 'Users',
    href: '/users',
    icon: Users,
    roles: ['admin']
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['admin', 'mentor']
  }
];

const Sidebar: React.FC = () => {
  const { role } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!role) return null;

  const filteredNavItems = navItems.filter(item => item.roles.includes(role));

  return (
    <div 
      className={cn(
        "fixed h-full bg-indigo-950 text-white transition-all duration-300 z-20",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-indigo-900">
        <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "")}>
          {!collapsed && <span className="text-xl font-bold ml-2">Mentor Hub</span>}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-indigo-800 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="py-4">
        <div className="mb-4 px-4">
          <div className={cn(
            "p-2 text-xs uppercase text-indigo-400 font-semibold",
            collapsed ? "text-center" : ""
          )}>
            {!collapsed && <span>{role} Menu</span>}
          </div>
        </div>

        <nav>
          <ul className="space-y-1">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) => cn(
                      "flex items-center py-2 px-4 transition-colors",
                      collapsed ? "justify-center" : "",
                      isActive 
                        ? "bg-indigo-800 text-white border-r-4 border-indigo-500" 
                        : "text-indigo-300 hover:bg-indigo-900 hover:text-white"
                    )}
                  >
                    <Icon size={20} className={collapsed ? "" : "mr-3"} />
                    {!collapsed && <span>{item.title}</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;