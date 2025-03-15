
import React from 'react';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { Button } from '@/components/ui/button';

interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
  category: string;
  location: string;
  duration: string;
}

interface ServiceListProps {
  services: Service[];
  clearLocationFilter: () => void;
}

export const ServiceList: React.FC<ServiceListProps> = ({ services, clearLocationFilter }) => {
  if (services.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-lg text-muted-foreground">No services found for the selected filters.</p>
        <Button 
          variant="outline" 
          onClick={clearLocationFilter}
          className="mt-4"
        >
          Clear Location Filter
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      {services.map((service) => (
        <ServiceCard 
          key={service.id}
          id={service.id}
          title={service.title}
          description={service.description}
          image={service.image_url}
          price={service.price}
          category={service.category === 'products' ? 'products' : service.category === 'guides' ? 'guides' : 'activities'}
          location={service.location.split(',')[0].trim()}
        />
      ))}
    </div>
  );
};
