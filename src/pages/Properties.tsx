
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTranslation } from '@/contexts/TranslationContext';
import { useProperties } from '@/hooks/useProperties';
import { usePropertyTranslations } from '@/hooks/usePropertyTranslations';
import { PropertyFilters } from '@/components/properties/PropertyFilters';
import { PropertiesList } from '@/components/properties/PropertiesList';
import { PropertyFeatures } from '@/components/properties/PropertyFeatures';

export default function Properties() {
  const [searchParams] = useSearchParams();
  const initialLocation = searchParams.get("location") || "all";
  const [location, setLocation] = useState(initialLocation);
  const { t, setCurrentPage } = useTranslation();
  
  // Custom hooks for data fetching
  const { properties, isLoading, hasError: propertiesError } = useProperties(location);
  const { getLocalizedPropertyContent, hasTranslationError } = usePropertyTranslations();

  // Set the current page for translations
  useEffect(() => {
    setCurrentPage('properties');
  }, [setCurrentPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <section className="container max-w-6xl mx-auto px-4 mb-16" id="properties-list">
          <div className="text-center mb-10">
            <h1 className="heading-lg mb-4">{t('properties.title')}</h1>
            <p className="paragraph-lg max-w-3xl mx-auto text-muted-foreground">
              {t('properties.subtitle')}
            </p>
          </div>
          
          {hasTranslationError && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                Could not load property translations. Showing default content.
              </AlertDescription>
            </Alert>
          )}
          
          {propertiesError && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                Could not load properties from database. Showing sample properties.
              </AlertDescription>
            </Alert>
          )}
          
          <PropertyFilters location={location} setLocation={setLocation} />
          
          <PropertiesList 
            properties={properties} 
            getLocalizedContent={getLocalizedPropertyContent} 
          />
        </section>
        
        <PropertyFeatures />
      </main>
      
      <Footer />
    </div>
  );
}
