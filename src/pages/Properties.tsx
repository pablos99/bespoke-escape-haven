
import React, { useState, useEffect } from 'react';
import { Footer } from '@/components/layout/Footer';
import { PropertyBookingCard } from '@/components/ui/PropertyBookingCard';
import { Button } from '@/components/ui/button';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from '@/contexts/AppContext';
import { supabase } from '@/integrations/supabase/client';

// Sample properties - in a production app, this would be fetched from the API
const properties = [
  {
    id: "bali-villa",
    title: "Tranquil Bali Villa",
    location: "Ubud, Bali",
    description: "Nestled in the lush rice fields of Ubud, this villa offers a perfect blend of traditional Balinese architecture and modern luxury.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582610116397-edb318620f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    ],
    price: 250,
    features: ["3 Bedrooms", "Private Pool", "Rice Field View", "Daily Breakfast", "Free Yoga Sessions"],
    rating: 4.9,
    locationFilter: "bali",
  },
  {
    id: "tulum-beach",
    title: "Tulum Beach Retreat",
    location: "Tulum, Mexico",
    description: "A stunning beachfront property with breathtaking views of the Caribbean Sea, just steps away from Tulum's pristine beaches.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582610116397-edb318620f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    ],
    price: 320,
    features: ["2 Bedrooms", "Oceanfront", "Rooftop Terrace", "Private Chef", "Bicycle Rental"],
    rating: 4.8,
    locationFilter: "tulum",
  },
];

export default function Properties() {
  const { language, t, setCurrentPage } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [location, setLocation] = useState<string>(searchParams.get("location") || "all");
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [propertyTranslations, setPropertyTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Set the current page for translations
  useEffect(() => {
    setCurrentPage('properties');
  }, [setCurrentPage]);

  // Fetch property translations from Supabase
  useEffect(() => {
    async function fetchPropertyTranslations() {
      try {
        const { data, error } = await supabase
          .from('property_translations')
          .select('property_id, title_en, description_en, title_es, description_es');
        
        if (error) {
          console.error('Error fetching property translations:', error);
          return;
        }
        
        // Convert data array to a map keyed by property_id
        const translationsMap: Record<string, any> = {};
        data.forEach(item => {
          translationsMap[item.property_id] = item;
        });
        
        setPropertyTranslations(translationsMap);
      } catch (error) {
        console.error('Error in fetching property translations:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPropertyTranslations();
  }, []);

  // Filter properties based on location
  useEffect(() => {
    if (location === "all") {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(properties.filter(property => property.locationFilter === location));
    }
  }, [location]);

  const handleLocationChange = (value: string) => {
    setLocation(value);
    if (value === "all") {
      searchParams.delete("location");
    } else {
      searchParams.set("location", value);
    }
    setSearchParams(searchParams);
  };

  // Helper function to get localized property content
  const getLocalizedPropertyContent = (property: any) => {
    const translation = propertyTranslations[property.id];
    
    // If we have a translation, use it; otherwise fall back to the property data
    return {
      title: translation ? translation[`title_${language}`] || property.title : property.title,
      description: translation ? translation[`description_${language}`] || property.description : property.description
    };
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">{t('common.loading')}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-8 pb-16">
        <section className="container max-w-6xl mx-auto px-4 mb-16" id="properties-list">
          <div className="text-center mb-10">
            <h1 className="heading-lg mb-4">{t('properties.title')}</h1>
            <p className="paragraph-lg max-w-3xl mx-auto text-muted-foreground">
              {t('properties.subtitle')}
            </p>
          </div>
          
          <div className="flex justify-end mb-8">
            <Select value={location} onValueChange={handleLocationChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('properties.filterByLocation')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('properties.allLocations')}</SelectItem>
                <SelectItem value="bali">Bali</SelectItem>
                <SelectItem value="tulum">Tulum</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProperties.map((property) => {
              const localizedContent = getLocalizedPropertyContent(property);
              
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
                />
              );
            })}
          </div>
        </section>
        
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
      </main>
      
      <Footer />
    </div>
  );
}
