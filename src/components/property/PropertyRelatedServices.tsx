
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { useApp } from '@/contexts/AppContext';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: 'activities' | 'products' | 'guides';
}

interface PropertyRelatedServicesProps {
  services: Service[];
}

export function PropertyRelatedServices({ services }: PropertyRelatedServicesProps) {
  const { t } = useApp();
  
  return (
    <section className="container mx-auto px-4 py-12 border-t border-border">
      <h2 className="heading-md mb-8">{t('property.bespokeServices')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard 
            key={service.id}
            {...service}
          />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button asChild>
          <Link to="/services">{t('buttons.viewAllServices')}</Link>
        </Button>
      </div>
    </section>
  );
}
