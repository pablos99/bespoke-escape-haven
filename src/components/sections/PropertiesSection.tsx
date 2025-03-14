import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/contexts/TranslationContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Sample properties data - in a real app would come from API/backend
const properties = [{
  id: 'bali-villa',
  title: 'Beachfront Villa',
  location: 'Canggu, Bali',
  description: 'A stunning beachfront villa with panoramic ocean views, infinity pool, and lush tropical gardens. Perfect for a luxury getaway in paradise.',
  image: 'https://images.unsplash.com/photo-1570737209810-87a8e7245f88?q=80&w=2532&auto=format&fit=crop',
  rating: 4.9,
  price: 350
}, {
  id: 'tulum-retreat',
  title: 'Jungle Retreat',
  location: 'Tulum, Mexico',
  description: 'Nestled in the lush jungle just minutes from Tulum\'s pristine beaches. Features a private cenote, open-air living, and sustainable design.',
  image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2670&auto=format&fit=crop',
  rating: 4.8,
  price: 295
}];

export function PropertiesSection() {
  const { language } = useApp();
  const { t, setCurrentPage } = useTranslation();
  const [propertyTranslations, setPropertyTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();
  
  // Set the current page to ensure proper translations are loaded
  useEffect(() => {
    setCurrentPage('properties');
  }, [setCurrentPage]);

  // Fetch property translations from Supabase
  useEffect(() => {
    async function fetchPropertyTranslations() {
      try {
        setIsLoading(true);
        setHasError(false);
        const { data, error } = await supabase.from('property_translations').select('property_id, title_en, description_en, title_es, description_es');
        if (error) {
          console.error('Error fetching property translations:', error);
          setHasError(true);
          toast({
            title: 'Error loading property data',
            description: 'Using default property information',
            variant: 'destructive'
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
        setHasError(true);
        toast({
          title: 'Error loading property data',
          description: 'Using default property information',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchPropertyTranslations();
  }, [toast]);

  // Helper function to get localized property content
  const getLocalizedPropertyContent = (property: any) => {
    const translation = propertyTranslations[property.id];

    // If we have a translation, use it; otherwise fall back to the property data
    return {
      title: translation ? translation[`title_${language}`] || property.title : property.title,
      description: translation ? translation[`description_${language}`] || property.description : property.description
    };
  };
  
  return <section className="py-20 px-6 md:px-8 lg:px-12 bg-sand-light">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="heading-lg mb-4 font-medium text-zinc-900">
              {t('properties.title')}
            </h2>
            <p className="paragraph font-medium text-zinc-900">
              {t('properties.subtitle')}
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button asChild variant="outline">
              <Link to="/properties" className="flex items-center text-foreground font-medium">
                {t('button.viewAll')}
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {properties.map(property => {
            const localizedContent = getLocalizedPropertyContent(property);
            return <PropertyCard 
              key={property.id} 
              {...property} 
              title={localizedContent.title} 
              description={localizedContent.description} 
              className="animate-fade-up opacity-0 [animation-fill-mode:forwards]" 
              style={{
                animationDelay: `${properties.indexOf(property) * 100}ms`
              }}
              viewDetailsLink={`/property/${property.id}`}
            />;
          })}
        </div>
      </div>
    </section>;
}
