
import React from 'react';
import { AppProvider } from './AppContext';
import { TranslationProvider } from './TranslationContext';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppProvider>
      <TranslationProvider>
        {children}
      </TranslationProvider>
    </AppProvider>
  );
};
