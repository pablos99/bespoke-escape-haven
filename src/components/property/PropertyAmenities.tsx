
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

interface PropertyAmenitiesProps {
  amenities: string[];
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  const { t } = useTranslation();
  
  return (
    <div className="my-12">
      <h2 className="heading-md mb-6">{t('property.amenities')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-4">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
