
import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';

type Language = 'en' | 'es';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  translations: Record<string, Record<Language, string>>;
  t: (key: string) => string;
}

// Get all translation keys
const allTranslations: Record<string, Record<Language, string>> = {};

// Generate combined translations object where each key points to an object with language values
function processTranslations(obj: any, prefix = '', result: any = {}) {
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      processTranslations(obj[key], fullKey, result);
    } else {
      if (!result[fullKey]) {
        result[fullKey] = { en: '', es: '' };
      }
      result[fullKey].en = enTranslations ? getNestedValue(enTranslations, fullKey) || fullKey : fullKey;
      result[fullKey].es = esTranslations ? getNestedValue(esTranslations, fullKey) || fullKey : fullKey;
    }
  }
  return result;
}

// Helper function to get nested value from object using dot notation
function getNestedValue(obj: any, path: string): string | undefined {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === undefined || current === null) return undefined;
    current = current[key];
  }
  
  return typeof current === 'string' ? current : undefined;
}

// Initialize translations
processTranslations({ ...enTranslations, ...esTranslations }, '', allTranslations);

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with browser preferences
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language;
    return savedLang || (navigator.language.startsWith('es') ? 'es' : 'en');
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Translation function
  const t = (key: string): string => {
    if (allTranslations[key] && allTranslations[key][language]) {
      return allTranslations[key][language];
    }
    // Fallback to key if translation not found
    return key;
  };

  return (
    <AppContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        theme, 
        setTheme,
        translations: allTranslations,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
