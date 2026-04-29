'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminLoginResponse, User } from '@/types/DashBoardTypes';
import http from '@/http/api';


interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
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

  const login = async (email: string, _password: string) : Promise<boolean> => {
    setIsLoading(true);
    
    try{
      const response = await http.post<AdminLoginResponse>('adm/auth', { email: email, senha: _password });
      const { adm, accessToken, refreshToken } = response.data;

      const userData: User = {
        id: adm?.id,
        name: adm.name,
        email: adm.email,
        role: 'Admin',
        status: 'Active',
        avatar: adm.photoUrl,
        createdAt: new Date().toISOString(),
      };
      console.log('Login successful:', response.data);
      setUser(userData);

      return true;
    }
    catch(error){
    
      console.error('Login failed:', error);
      setUser(null);

    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
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
