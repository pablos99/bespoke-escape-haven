import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
  currentPage: string;
  setCurrentPage: (page: string) => void;
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

// Define page mappings for translation loading
const pageToKeyPrefixMap: Record<string, string[]> = {
  'index': ['nav', 'footer', 'button', 'buttons', 'common'],
  'properties': ['nav', 'footer', 'button', 'buttons', 'common', 'properties', 'property'],
  'property': ['nav', 'footer', 'button', 'buttons', 'common', 'properties', 'property'],
  'services': ['nav', 'footer', 'button', 'buttons', 'common', 'services'],
  'about': ['nav', 'footer', 'button', 'buttons', 'common', 'about'],
  'booking': ['nav', 'footer', 'button', 'buttons', 'common', 'booking'],
  'guides': ['nav', 'footer', 'button', 'buttons', 'common', 'guides'],
  'artisanProducts': ['nav', 'footer', 'button', 'buttons', 'common', 'artisan', 'products'],
  'destinations': ['nav', 'footer', 'button', 'buttons', 'common', 'destinations', 'cities'],
  'privacy': ['nav', 'footer', 'button', 'buttons', 'common'],
  'terms': ['nav', 'footer', 'button', 'buttons', 'common'],
  'auth': ['nav', 'footer', 'button', 'buttons', 'common', 'auth']
};

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

  const [dbTranslations, setDbTranslations] = useState<Record<string, Record<Language, string>>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<string>('index');

  // Load translations from Supabase based on current page
  useEffect(() => {
    async function fetchTranslations() {
      try {
        // Determine which page prefixes to load
        const pagesToLoad = pageToKeyPrefixMap[currentPage] || ['common', 'nav', 'footer', 'button', 'buttons'];
        
        const { data, error } = await supabase
          .from('translations')
          .select('key, en, es, page')
          .in('page', pagesToLoad);
        
        if (error) {
          console.error('Error fetching translations:', error);
          return;
        }
        
        const translationsMap: Record<string, Record<Language, string>> = {};
        data.forEach(row => {
          translationsMap[row.key] = {
            en: row.en || '',
            es: row.es || ''
          };
        });
        
        setDbTranslations(translationsMap);
      } catch (error) {
        console.error('Error in fetching translations:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchTranslations();
  }, [currentPage]);

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

  // Merge local JSON translations with DB translations
  const mergedTranslations = useMemo(() => {
    const merged = { ...allTranslations };
    
    // Override with database translations if available
    Object.keys(dbTranslations).forEach(key => {
      merged[key] = dbTranslations[key];
    });
    
    return merged;
  }, [dbTranslations]);

  // Translation function
  const t = (key: string): string => {
    if (mergedTranslations[key] && mergedTranslations[key][language]) {
      return mergedTranslations[key][language];
    }
    // Fallback to key if translation not found
    return key;
  };

  if (isLoading) {
    // You might want to add a loading indicator or skeleton here
    return <div>Loading translations...</div>;
  }

  return (
    <AppContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        theme, 
        setTheme,
        translations: mergedTranslations,
        t,
        currentPage,
        setCurrentPage
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
