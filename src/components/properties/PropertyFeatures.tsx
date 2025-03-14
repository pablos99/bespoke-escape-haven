
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';

export const PropertyFeatures: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="bg-secondary py-16" id="property-features">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Luxury amenities" 
              className="w-full h-auto"
            />
          </div>
          <div>
            <h2 className="heading-md mb-4">{t('properties.serviceHeading')}</h2>
            <p className="paragraph mb-6">
              {t('properties.serviceDescription1')}
            </p>
            <p className="paragraph mb-6">
              {t('properties.serviceDescription2')}
            </p>
            <Button asChild>
              <Link to="/booking">{t('buttons.bookYourStay')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
