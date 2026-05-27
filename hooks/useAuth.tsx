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
    // Load saved user and tokens if available
    try {
      if (typeof window !== 'undefined') {
        const savedUser = localStorage.getItem('eventus_admin_user');
        if (savedUser) setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      // ignore
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) : Promise<boolean> => {
    setIsLoading(true);

    try{
      const response = await http.post<AdminLoginResponse>('adm/auth', { email: email, senha: _password });
      const responseData = response.data as AdminLoginResponse & {
        token?: string;
        access_token?: string;
        refresh_token?: string;
      };
      const { adm } = responseData;
      const accessToken = responseData.accessToken ?? responseData.token ?? responseData.access_token;
      const refreshToken = responseData.refreshToken ?? responseData.refresh_token;

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

      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('eventus_admin_user', JSON.stringify(userData));
          if (accessToken) localStorage.setItem('eventus_admin_access_token', accessToken);
          if (refreshToken) localStorage.setItem('eventus_admin_refresh_token', refreshToken);
        }
      } catch (e) {
        // ignore localStorage errors
      }

      setIsLoading(false);
      return true;
    }
    catch(error){
      console.error('Login failed:', error);
      setUser(null);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('eventus_admin_user');
        localStorage.removeItem('eventus_admin_access_token');
        localStorage.removeItem('eventus_admin_refresh_token');
      }
    } catch (e) {
      // ignore
    }
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
