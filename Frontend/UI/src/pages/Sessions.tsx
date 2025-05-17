import React, { useState } from 'react';
import { Calendar, Clock, User, Filter, ChevronDown, Plus } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

// Mock data for sessions
const sessionsMock = [
  { id: 1, student: 'Alex Johnson', date: '2025-06-10', time: '10:00 AM', duration: 60, status: 'upcoming', topics: ['React', 'TypeScript'] },
  { id: 2, student: 'Maria Garcia', date: '2025-06-09', time: '2:00 PM', duration: 90, status: 'upcoming', topics: ['Node.js', 'Express'] },
  { id: 3, student: 'James Wilson', date: '2025-06-08', time: '11:30 AM', duration: 60, status: 'completed', topics: ['Python', 'Django'] },
  { id: 4, student: 'Emma Thompson', date: '2025-06-07', time: '4:00 PM', duration: 45, status: 'completed', topics: ['React Native'] },
  { id: 5, student: 'Daniel Lee', date: '2025-06-06', time: '1:00 PM', duration: 60, status: 'cancelled', topics: ['Vue.js', 'Nuxt'] },
  { id: 6, student: 'Sophia Martinez', date: '2025-06-05', time: '3:30 PM', duration: 90, status: 'completed', topics: ['JavaScript', 'HTML/CSS'] },
];

const Sessions: React.FC = () => {
  const { role } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [sessions, setSessions] = useState(sessionsMock);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  const filteredSessions = activeFilter === 'all' 
    ? sessions 
    : sessions.filter(session => session.status === activeFilter);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sessions</h1>
          <p className="text-gray-500 mt-1">View and manage your mentoring sessions</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          <span>New Session</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveFilter('upcoming')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeFilter === 'upcoming' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Upcoming
            </button>
            <button 
              onClick={() => setActiveFilter('completed')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeFilter === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
            <button 
              onClick={() => setActiveFilter('cancelled')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeFilter === 'cancelled' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Cancelled
            </button>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setFilterMenuOpen(!filterMenuOpen)}
              className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 flex items-center hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              <span>Filter</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
            
            {filterMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-xs font-medium text-gray-500">FILTER BY</p>
                </div>
                <div className="py-1">
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Date: Newest First
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Date: Oldest First
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Duration: Longest First
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Duration: Shortest First
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredSessions.length > 0 ? (
          filteredSessions.map(session => (
            <Card key={session.id} className="hover:border-indigo-200 cursor-pointer transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 md:mr-4 mx-auto md:mx-0 mb-4 md:mb-0">
                    <User className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-medium text-gray-900">{session.student}</h3>
                    <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                      {session.topics.map((topic, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center mt-4 md:mt-0 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">{session.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">{session.time} ({session.duration} min)</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(session.status)}`}>
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </span>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No sessions found</h3>
            <p className="mt-2 text-gray-500">
              No {activeFilter !== 'all' ? activeFilter : ''} sessions available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;