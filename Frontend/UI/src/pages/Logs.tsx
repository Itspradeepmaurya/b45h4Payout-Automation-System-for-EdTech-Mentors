import React, { useState } from 'react';
import { FileText, AlertCircle, Info, Search, Calendar, Filter, Download } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

// Mock data for logs
const logsMock = [
  { id: 1, type: 'info', message: 'User login successful', source: 'Authentication Service', timestamp: '2025-06-10 10:30:45' },
  { id: 2, type: 'error', message: 'Payment processing failed', source: 'Payment Service', timestamp: '2025-06-10 09:45:22' },
  { id: 3, type: 'info', message: 'Session scheduled with Alex Johnson', source: 'Scheduling Service', timestamp: '2025-06-09 14:15:10' },
  { id: 4, type: 'warning', message: 'User account nearing storage limit', source: 'Storage Service', timestamp: '2025-06-09 11:20:33' },
  { id: 5, type: 'error', message: 'Video call connection dropped', source: 'Video Service', timestamp: '2025-06-08 16:05:19' },
  { id: 6, type: 'info', message: 'New message received', source: 'Messaging Service', timestamp: '2025-06-08 13:40:27' },
  { id: 7, type: 'warning', message: 'High CPU usage detected', source: 'System Monitor', timestamp: '2025-06-07 22:10:15' },
  { id: 8, type: 'info', message: 'Feedback submitted by student', source: 'Feedback Service', timestamp: '2025-06-07 18:55:42' },
  { id: 9, type: 'error', message: 'Database connection timeout', source: 'Database Service', timestamp: '2025-06-06 09:30:11' },
  { id: 10, type: 'info', message: 'System backup completed successfully', source: 'Backup Service', timestamp: '2025-06-06 02:00:04' },
];

const Logs: React.FC = () => {
  const { role } = useAuth();
  const [logs, setLogs] = useState(logsMock);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredLogs = logs
    .filter(log => 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(log => activeFilter === 'all' ? true : log.type === activeFilter);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Logs</h1>
        <p className="text-gray-500 mt-1">Monitor system activities and issues</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search logs..."
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveFilter('info')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeFilter === 'info' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Info
            </button>
            <button 
              onClick={() => setActiveFilter('warning')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeFilter === 'warning' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Warnings
            </button>
            <button 
              onClick={() => setActiveFilter('error')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeFilter === 'error' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Errors
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Date Range</span>
            </button>
            
            <button className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 flex items-center text-sm">
              <Download className="h-4 w-4 mr-2" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredLogs.length > 0 ? (
          filteredLogs.map(log => (
            <Card key={log.id} className="hover:border-gray-300 transition-all">
              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  {getTypeIcon(log.type)}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-md font-medium text-gray-900">{log.message}</h3>
                      <p className="text-sm text-gray-500">{log.source}</p>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0">
                      <span className={`text-xs px-2 py-1 rounded-full ${getTypeStyle(log.type)} mr-3`}>
                        {log.type.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">{log.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No logs found</h3>
            <p className="mt-2 text-gray-500">
              No {activeFilter !== 'all' ? activeFilter : ''} logs match your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logs;