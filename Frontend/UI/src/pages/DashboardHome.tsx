import React from 'react';
import { Calendar, Users, Clock, CreditCard, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, StatCard } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

const DashboardHome: React.FC = () => {
  const { role } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to your {role} dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Sessions" 
          value="145" 
          icon={Calendar}
          trend="up"
          change={12}
        />
        <StatCard 
          title="Active Students" 
          value="48" 
          icon={Users}
          trend="up"
          change={8}
        />
        <StatCard 
          title="Session Hours" 
          value="286" 
          icon={Clock}
          trend="up"
          change={15}
        />
        <StatCard 
          title="Revenue" 
          value="$8,492" 
          icon={CreditCard}
          trend="up"
          change={24}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card title="Recent Activity" className="lg:col-span-2">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start p-2 hover:bg-gray-50 rounded-md">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mr-4">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Session completed with Student #{i}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.floor(Math.random() * 24)} hours ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card title="Upcoming Sessions">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <p className="text-sm font-medium">Student #{i}</p>
                <p className="text-xs text-gray-500 mt-1">Tomorrow, {9 + i}:00 AM</p>
                <div className="mt-2 flex space-x-2">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                    React
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    TypeScript
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {role === 'admin' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card title="User Growth" subtitle="New user registrations">
            <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-indigo-500 mx-auto" />
                <p className="mt-2 text-sm text-gray-500">User growth chart placeholder</p>
              </div>
            </div>
          </Card>
          
          <Card title="Revenue Overview" subtitle="Monthly revenue trends">
            <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
              <div className="text-center">
                <TrendingDown className="h-8 w-8 text-amber-500 mx-auto" />
                <p className="mt-2 text-sm text-gray-500">Revenue chart placeholder</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;