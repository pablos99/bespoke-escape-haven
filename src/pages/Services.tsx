
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { useSearchParams } from 'react-router-dom';
import { ServiceFilters } from '@/components/services/ServiceFilters';
import { ServiceList } from '@/components/services/ServiceList';
import { CustomServicesCTA } from '@/components/services/CustomServicesCTA';
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
  duration: string;
  is_featured: boolean;
}

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('category') || 'all');
  const [location, setLocation] = useState<string>(searchParams.get('location') || 'all');
  
  // Fetch services from Supabase
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services', activeTab, location],
    queryFn: async () => {
      let query = supabase
        .from('services')
        .select('*')
        .eq('status', 'active');
      
      // Apply category filter if not 'all'
      if (activeTab !== 'all') {
        query = query.eq('category', activeTab);
      }
      
      // Apply location filter if not 'all'
      if (location !== 'all') {
        query = query.ilike('location', `%${location}%`);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      return data as Service[];
    }
  });
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', value);
    }
    setSearchParams(searchParams);
  };
  
  const handleLocationChange = (value: string) => {
    setLocation(value);
    if (value === 'all') {
      searchParams.delete('location');
    } else {
      searchParams.set('location', value);
    }
    setSearchParams(searchParams);
  };
  
  const clearLocationFilter = () => {
    setLocation('all');
    searchParams.delete('location');
    setSearchParams(searchParams);
  };
  
  // Update state from URL params when they change
  useEffect(() => {
    // Handle initial URL params
    const categoryParam = searchParams.get('category');
    const locationParam = searchParams.get('location');
    
    if (categoryParam) {
      setActiveTab(categoryParam);
    }
    
    if (locationParam) {
      setLocation(locationParam);
    }
  }, [searchParams]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero 
          title="Bespoke Services"
          subtitle="Enhance your stay with curated local experiences, artisan products, and knowledgeable guides."
          backgroundImage="https://images.unsplash.com/photo-1470010762743-1fa2363f65ca?q=80&w=2670&auto=format&fit=crop"
          buttonText="Book Your Experience"
          buttonLink="/booking"
        />
        
        <section className="py-20 px-6 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-lg mb-4">Discover Authentic Experiences</h2>
              <p className="paragraph text-muted-foreground">
                We've partnered with the finest local artisans, experienced guides, and activity providers
                to offer you unique experiences that showcase the authentic culture of Bali and Tulum.
              </p>
            </div>
            
            <ServiceFilters 
              activeTab={activeTab}
              location={location}
              onTabChange={handleTabChange}
              onLocationChange={handleLocationChange}
            />
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <ServiceList 
                services={services}
                clearLocationFilter={clearLocationFilter}
              />
            )}
          </div>
        </section>
        
        <CustomServicesCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
