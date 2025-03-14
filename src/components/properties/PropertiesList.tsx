
import React from 'react';
import { PropertyBookingCard } from '@/components/ui/PropertyBookingCard';
import { Property } from '@/hooks/useProperties';

type PropertiesListProps = {
  properties: Property[];
  getLocalizedContent: (property: Property) => { title: string; description: string };
};

export const PropertiesList: React.FC<PropertiesListProps> = ({ 
  properties, 
  getLocalizedContent 
}) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No properties found for this location.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {properties.map((property) => {
        const localizedContent = getLocalizedContent(property);
        
        return (
          <PropertyBookingCard 
            key={property.id}
            id={property.id}
            title={localizedContent.title}
            location={property.location}
            description={localizedContent.description}
            image={property.images[0]}
            price={property.price}
            rating={property.rating}
            locationFilter={property.locationFilter}
          />
        );
      })}
    </div>
  );
};
