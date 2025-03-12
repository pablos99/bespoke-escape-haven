
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  translations: Record<string, Record<string, string>>;
  t: (key: string) => string;
}

// Basic translations
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.properties': 'Properties',
    'nav.services': 'Services',
    'nav.booking': 'Booking',
    'nav.about': 'About',
    'nav.cities': 'Destinations',
    'nav.bali': 'Bali',
    'nav.tulum': 'Tulum',
    'button.bookNow': 'Book Now',
    'button.learnMore': 'Learn More',
    'button.viewDetails': 'View Details',
    'button.exploreProperties': 'Explore Properties',
    'button.exploreCities': 'Explore Destinations',
    'button.darkMode': 'Dark Mode',
    'button.lightMode': 'Light Mode',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.contactUs': 'Contact Us',
    'footer.rights': 'All rights reserved.',
    
    // Cities
    'cities.bali.title': 'Discover Bali',
    'cities.bali.subtitle': 'Explore the island of gods',
    'cities.tulum.title': 'Discover Tulum',
    'cities.tulum.subtitle': 'Experience the magic of the Riviera Maya',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.properties': 'Propiedades',
    'nav.services': 'Servicios',
    'nav.booking': 'Reservas',
    'nav.about': 'Nosotros',
    'nav.cities': 'Destinos',
    'nav.bali': 'Bali',
    'nav.tulum': 'Tulum',
    'button.bookNow': 'Reservar',
    'button.learnMore': 'Más Información',
    'button.viewDetails': 'Ver Detalles',
    'button.exploreProperties': 'Explorar Propiedades',
    'button.exploreCities': 'Explorar Destinos',
    'button.darkMode': 'Modo Oscuro',
    'button.lightMode': 'Modo Claro',
    
    // Footer
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.contactUs': 'Contáctanos',
    'footer.rights': 'Todos los derechos reservados.',
    
    // Cities
    'cities.bali.title': 'Descubre Bali',
    'cities.bali.subtitle': 'Explora la isla de los dioses',
    'cities.tulum.title': 'Descubre Tulum',
    'cities.tulum.subtitle': 'Experimenta la magia de la Riviera Maya',
  }
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
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        theme, 
        setTheme,
        translations,
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
