
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { ArrowRight } from 'lucide-react';
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
  is_featured: boolean;
}

export function ServicesSection() {
  const { data: featuredServices = [], isLoading } = useQuery({
    queryKey: ['featured-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_featured', true)
        .eq('status', 'active')
        .limit(3);
      
      if (error) throw error;
      return data as Service[];
    }
  });

  return (
    <section className="py-20 px-6 md:px-8 lg:px-12 bg-ocean-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-lg mb-4 text-foreground">Bespoke Services</h2>
          <p className="paragraph text-foreground/80">
            Enhance your stay with our curated selection of local artisan products,
            unique experiences, and knowledgeable guides.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceCard 
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                image={service.image_url}
                price={service.price}
                category={service.category === 'products' ? 'products' : service.category === 'guides' ? 'guides' : 'activities'}
                location={service.location.split(',')[0].trim()}
                className="animate-fade-up opacity-0 [animation-fill-mode:forwards]"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button asChild>
            <Link to="/services" className="flex items-center justify-center">
              Explore All Services
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
