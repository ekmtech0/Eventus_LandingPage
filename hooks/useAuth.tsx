'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/DashBoardTypes';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock initial check
    const savedUser = localStorage.getItem('eventus_admin_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    // Mock login logic
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email.includes('admin')) {
          const mockUser: User = {
            id: '1',
            name: 'Admin User',
            email: email,
            role: email === 'superadmin@eventus.com' ? 'SuperAdmin' : 'Admin',
            status: 'Active',
            createdAt: new Date().toISOString(),
          };
          setUser(mockUser);
          localStorage.setItem('eventus_admin_user', JSON.stringify(mockUser));
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('Invalid credentials. Use an email with "admin" in it.'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eventus_admin_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
