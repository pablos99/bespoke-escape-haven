
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { useTranslation } from '@/contexts/TranslationContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
  category: string;
  location: string;
}

interface PropertyRelatedServicesProps {
  location?: string;
}

export function PropertyRelatedServices({ location }: PropertyRelatedServicesProps) {
  const { t } = useTranslation();
  
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['related-services', location],
    queryFn: async () => {
      if (!location) return [];
      
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('status', 'active')
        .ilike('location', `%${location}%`)
        .limit(3);
      
      if (error) throw error;
      return data as Service[];
    },
    enabled: !!location
  });
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (services.length === 0) {
    return null;
  }
  
  return (
    <section className="container mx-auto px-4 py-12 border-t border-border">
      <h2 className="heading-md mb-8">{t('property.bespokeServices')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      
      <div className="text-center mt-8">
        <Button asChild>
          <Link to={`/services?location=${encodeURIComponent(location || '')}`}>
            {t('buttons.viewAllServices')}
          </Link>
        </Button>
      </div>
    </section>
  );
}
