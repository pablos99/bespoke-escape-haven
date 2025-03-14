
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';
import { useToast } from '@/hooks/use-toast';
import { getNestedValue, processTranslations, pageToKeyPrefixMap, Translation } from '@/utils/translationUtils';
import { useApp } from './AppContext';

type Language = 'en' | 'es';

interface TranslationContextType {
  translations: Record<string, Record<Language, string>>;
  t: (key: string) => string;
  isTranslationsLoading: boolean;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  refreshTranslations: () => Promise<void>;
}

// Generate combined translations object where each key points to an object with language values
const allTranslations: Record<string, Record<Language, string>> = {};

// Initialize translations
const enResult = processTranslations(enTranslations, '', {});
const esResult = processTranslations(esTranslations, '', {});

// Merge the translations
Object.keys(enResult).forEach(key => {
  allTranslations[key] = { en: enResult[key].en, es: '' };
});

Object.keys(esResult).forEach(key => {
  if (allTranslations[key]) {
    allTranslations[key].es = esResult[key].en;
  } else {
    allTranslations[key] = { en: key, es: esResult[key].en };
  }
});

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useApp();
  const [dbTranslations, setDbTranslations] = useState<Record<string, Record<Language, string>>>({});
  const [isTranslationsLoading, setIsTranslationsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<string>('index');
  const { toast } = useToast();

  // Function to fetch translations that can be called to refresh data
  const fetchTranslations = async () => {
    try {
      setIsTranslationsLoading(true);
      
      // Determine which page prefixes to load
      const pagesToLoad = pageToKeyPrefixMap[currentPage] || ['common', 'nav', 'footer', 'button', 'buttons'];
      
      const { data, error } = await supabase
        .from('translations')
        .select('*')
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
        data.forEach((row: Translation) => {
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
  };

  // Load translations from Supabase based on current page
  useEffect(() => {
    fetchTranslations();
  }, [currentPage]);

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
    <TranslationContext.Provider 
      value={{ 
        translations: mergedTranslations,
        t,
        currentPage,
        setCurrentPage,
        isTranslationsLoading,
        refreshTranslations: fetchTranslations
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
