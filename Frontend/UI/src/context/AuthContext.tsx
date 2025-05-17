import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Role, User } from '../types';

type AuthContextType = {
  user: User | null;
  role: Role | null;
  isAuthenticated: boolean;
  setRole: (role: Role) => void;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const adminUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100',
  role: 'admin'
};

const mentorUser: User = {
  id: '2',
  name: 'Mentor User',
  email: 'mentor@example.com',
  avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100',
  role: 'mentor'
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(adminUser); // Default to admin for demo
  const [role, setRole] = useState<Role | null>(adminUser.role);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default logged in for demo

  const login = () => {
    setIsAuthenticated(true);
    setUser(role === 'admin' ? adminUser : mentorUser);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleSetRole = (newRole: Role) => {
    setRole(newRole);
    setUser(newRole === 'admin' ? adminUser : mentorUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        setRole: handleSetRole,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};