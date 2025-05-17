import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/layout/Dashboard';
import DashboardHome from './pages/DashboardHome';
import Sessions from './pages/Sessions';
import Receipts from './pages/Receipts';
import Chat from './pages/Chat';
import Logs from './pages/Logs';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="sessions" element={<Sessions />} />
            <Route path="receipts" element={<Receipts />} />
            <Route path="chat" element={<Chat />} />
            <Route path="logs" element={<Logs />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;