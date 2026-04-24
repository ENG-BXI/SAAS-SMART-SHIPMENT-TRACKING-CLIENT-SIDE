'use client';
import {IUser} from '@/Interfaces/IUser';
import React, {createContext, useState} from 'react';
interface IAppContext {
  isAuthenticated: boolean;
  setIsAuthenticated?: (value: boolean) => void;
  user: IUser | null;
  setUser?: (value: IUser | null) => void;
}
const AuthContext = createContext<IAppContext | null>(null);
const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  return <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser}}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useContext must be used within AppContextProvider');
  }
  return context;
}
export default AuthContextProvider;
