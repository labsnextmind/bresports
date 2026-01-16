import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: number;
  username: string;
  email: string;
};

type Admin = {
  id: number;
  email: string;
};

interface AuthContextType {
  user: User | null;
  admin: Admin | null;
  isAuthLoading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  adminLogin: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    // simulate auth check
    setTimeout(() => setIsAuthLoading(false), 500);
  }, []);

  const login = (email: string, password: string) => {
    setUser({ id: 1, username: 'demo_user', email });
  };

  const adminLogin = (email: string, password: string) => {
    setAdmin({ id: 1, email });
  };

  const logout = () => {
    setUser(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, admin, isAuthLoading, login, logout, adminLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
