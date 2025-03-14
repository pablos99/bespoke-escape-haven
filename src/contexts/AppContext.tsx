import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';
import { useToast } from '@/hooks/use-toast';

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
  isTranslationsLoading: boolean;
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
  const [isTranslationsLoading, setIsTranslationsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<string>('index');
  const { toast } = useToast();

  // Load translations from Supabase based on current page
  useEffect(() => {
    async function fetchTranslations() {
      try {
        setIsTranslationsLoading(true);
        
        // Determine which page prefixes to load
        const pagesToLoad = pageToKeyPrefixMap[currentPage] || ['common', 'nav', 'footer', 'button', 'buttons'];
        
        const { data, error } = await supabase
          .from('translations')
          .select('key, en, es, page')
          .in('page', pagesToLoad);
        
        if (error) {
          console.error('Error fetching translations:', error);
          toast({
            title: 'Translation Error',
            description: 'Could not load translations. Using fallback values.',
            variant: 'destructive',
          });
          return;
        }
        
        const translationsMap: Record<string, Record<Language, string>> = {};
        if (data && data.length > 0) {
          data.forEach(row => {
            translationsMap[row.key] = {
              en: row.en || row.key,
              es: row.es || row.key
            };
          });
          setDbTranslations(translationsMap);
        } else {
          console.log('No translations found for pages:', pagesToLoad);
        }
      } catch (error) {
        console.error('Error in fetching translations:', error);
        toast({
          title: 'Translation Error',
          description: 'Could not load translations. Using fallback values.',
          variant: 'destructive',
        });
      } finally {
        setIsTranslationsLoading(false);
      }
    }
    
    fetchTranslations();
  }, [currentPage, toast]);

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
    // If the key doesn't exist in translations, return the key itself as fallback
    if (!mergedTranslations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    // If the translation exists for the current language, return it
    if (mergedTranslations[key][language]) {
      return mergedTranslations[key][language];
    }
    
    // Otherwise return the key as fallback
    console.warn(`Translation missing for key: ${key} in language: ${language}`);
    return key;
  };

  // During initial loading, show a simple spinner rather than blocking the entire app
  if (isTranslationsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
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
        setCurrentPage,
        isTranslationsLoading
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
