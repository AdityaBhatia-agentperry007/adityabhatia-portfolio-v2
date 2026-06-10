'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  doomTriggered: boolean;
  triggerDoom: () => void;
  closeDoom: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [doomTriggered, setDoomTriggered] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const triggerDoom = () => {
    setDoomTriggered(true);
  };

  const closeDoom = () => {
    setDoomTriggered(false);
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, doomTriggered, triggerDoom, closeDoom }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
