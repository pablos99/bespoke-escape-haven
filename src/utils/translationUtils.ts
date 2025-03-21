
// Helper function to get nested value from object using dot notation
export function getNestedValue(obj: any, path: string): string | undefined {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === undefined || current === null) return undefined;
    current = current[key];
  }
  
  return typeof current === 'string' ? current : undefined;
}

// Process translations object into a unified format
export function processTranslations(obj: any, prefix = '', result: any = {}) {
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      processTranslations(obj[key], fullKey, result);
    } else {
      if (!result[fullKey]) {
        result[fullKey] = { en: '', es: '' };
      }
      result[fullKey].en = obj[key] || fullKey;
    }
  }
  return result;
}

// Define page mappings for translation loading
export const pageToKeyPrefixMap: Record<string, string[]> = {
  'index': ['nav', 'footer', 'button', 'buttons', 'common', 'admin', 'settings', 'profile'],
  'properties': ['nav', 'footer', 'button', 'buttons', 'common', 'properties', 'property', 'admin', 'settings', 'profile'],
  'property': ['nav', 'footer', 'button', 'buttons', 'common', 'properties', 'property', 'admin', 'settings', 'profile'],
  'services': ['nav', 'footer', 'button', 'buttons', 'common', 'services', 'admin', 'settings', 'profile'],
  'about': ['nav', 'footer', 'button', 'buttons', 'common', 'about', 'admin', 'settings', 'profile'],
  'booking': ['nav', 'footer', 'button', 'buttons', 'common', 'booking', 'admin', 'settings', 'profile'],
  'guides': ['nav', 'footer', 'button', 'buttons', 'common', 'guides', 'admin', 'settings', 'profile'],
  'artisanProducts': ['nav', 'footer', 'button', 'buttons', 'common', 'artisan', 'products', 'admin', 'settings', 'profile'],
  'destinations': ['nav', 'footer', 'button', 'buttons', 'common', 'destinations', 'cities', 'admin', 'settings', 'profile'],
  'privacy': ['nav', 'footer', 'button', 'buttons', 'common', 'admin', 'settings', 'profile'],
  'terms': ['nav', 'footer', 'button', 'buttons', 'common', 'admin', 'settings', 'profile'],
  'auth': ['nav', 'footer', 'button', 'buttons', 'common', 'auth', 'admin', 'settings', 'profile'],
  'admin': ['nav', 'footer', 'button', 'buttons', 'common', 'admin', 'settings', 'profile']
};

// Utility function to get all page options for dropdown
export function getPageOptions(): string[] {
  const pages = new Set<string>();
  
  // Add all pages from the map
  Object.values(pageToKeyPrefixMap).forEach(prefixes => {
    prefixes.forEach(prefix => pages.add(prefix));
  });
  
  return Array.from(pages).sort();
}

// Translation interface for consistency
export interface Translation {
  id: string;
  key: string;
  en: string;
  es: string;
  page: string;
}
