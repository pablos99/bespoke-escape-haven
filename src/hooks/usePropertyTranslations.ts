
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/contexts/AppContext';
import { Property } from './useProperties';

export const usePropertyTranslations = () => {
  const [propertyTranslations, setPropertyTranslations] = useState<Record<string, any>>({});
  const [hasTranslationError, setHasTranslationError] = useState(false);
  const { language } = useApp();
  const { toast } = useToast();

  // Fetch property translations from Supabase
  useEffect(() => {
    async function fetchPropertyTranslations() {
      try {
        setHasTranslationError(false);
        
        const { data, error } = await supabase
          .from('property_translations')
          .select('property_id, title_en, description_en, title_es, description_es');
        
        if (error) {
          console.error('Error fetching property translations:', error);
          setHasTranslationError(true);
          toast({
            title: 'Translation Error',
            description: 'Could not load property translations. Using default values.',
            variant: 'destructive',
          });
          return;
        }
        
        // Convert data array to a map keyed by property_id
        const translationsMap: Record<string, any> = {};
        if (data && data.length > 0) {
          data.forEach(item => {
            translationsMap[item.property_id] = item;
          });
          setPropertyTranslations(translationsMap);
        } else {
          console.log('No property translations found');
        }
      } catch (error) {
        console.error('Error in fetching property translations:', error);
        setHasTranslationError(true);
        toast({
          title: 'Translation Error',
          description: 'Could not load property translations. Using default values.',
          variant: 'destructive',
        });
      }
    }
    
    fetchPropertyTranslations();
  }, [toast]);

  // Helper function to get localized property content
  const getLocalizedPropertyContent = (property: Property) => {
    const translation = propertyTranslations[property.id];
    
    // If we have a translation, use it; otherwise fall back to the property data
    return {
      title: translation ? translation[`title_${language}`] || property.title : property.title,
      description: translation ? translation[`description_${language}`] || property.description : property.description
    };
  };

  return {
    getLocalizedPropertyContent,
    hasTranslationError
  };
};
