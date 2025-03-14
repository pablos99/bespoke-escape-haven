
import React from 'react';
import { AppProvider } from './AppContext';
import { TranslationProvider } from './TranslationContext';
import { AuthProvider } from './AuthContext';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppProvider>
      <TranslationProvider>
        {children}
      </TranslationProvider>
    </AppProvider>
  );
};
