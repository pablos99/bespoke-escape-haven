import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
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
import { useTranslation } from '@/contexts/TranslationContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
    id: "bali-beach-house",
    title: "Beachfront Paradise",
    location: "Seminyak, Bali",
    description: "Direct beachfront access with stunning sunset views. Modern luxury villa with infinity pool overlooking the Indian Ocean.",
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    ],
    price: 375,
    features: ["4 Bedrooms", "Beachfront", "Infinity Pool", "Private Chef", "Beach Cabana"],
    rating: 4.9,
    locationFilter: "bali",
  },
  {
    id: "tulum-beach",
    title: "Tulum Beach Retreat",
    location: "Tulum, Mexico",
    description: "A stunning beachfront property with breathtaking views of the Caribbean Sea, just steps away from Tulum's pristine beaches.",
    images: [
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    ],
    price: 320,
    features: ["2 Bedrooms", "Oceanfront", "Rooftop Terrace", "Private Chef", "Bicycle Rental"],
    rating: 4.8,
    locationFilter: "tulum",
  },
  {
    id: "tulum-jungle",
    title: "Jungle Eco-Retreat",
    location: "Tulum, Mexico",
    description: "Sustainable luxury in the heart of the Mayan jungle. Solar-powered villa with natural cenote and authentic temazcal experience.",
    images: [
      "https://images.unsplash.com/photo-1605538032404-d7e005d35b57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    ],
    price: 290,
    features: ["2 Bedrooms", "Private Cenote", "Organic Garden", "Mayan Spa Treatments", "Jungle Tours"],
    rating: 4.7,
    locationFilter: "tulum",
  },
  {
    id: "costa-rica-villa",
    title: "Costa Rica Surf Villa",
    location: "Santa Teresa, Costa Rica",
    description: "Luxury beachfront villa in the surf paradise of Santa Teresa with panoramic ocean views and direct access to the best waves.",
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    ],
    price: 420,
    features: ["4 Bedrooms", "Infinity Pool", "Surf Break Access", "Outdoor Kitchen", "Yoga Deck"],
    rating: 4.9,
    locationFilter: "costa-rica",
  },
  {
    id: "costa-rica-treehouse",
    title: "Luxury Rainforest Treehouse",
    location: "Monteverde, Costa Rica",
    description: "Elevated luxury in the cloud forest with panoramic canopy views. Sustainably built treehouse with premium amenities and wildlife encounters.",
    images: [
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1628744424121-c9dfe5285ada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    ],
    price: 380,
    features: ["2 Bedrooms", "Glass Walls", "Canopy Hot Tub", "Birdwatching Deck", "Gourmet Breakfast"],
    rating: 4.8,
    locationFilter: "costa-rica",
  }
];

  // Set the current page for translations
  useEffect(() => {
    setCurrentPage('properties');
  }, [setCurrentPage]);

  // Fetch property translations from Supabase
  useEffect(() => {
    async function fetchPropertyTranslations() {
      try {
        setIsLoading(true);
        setHasError(false);
        
        const { data, error } = await supabase
          .from('property_translations')
          .select('property_id, title_en, description_en, title_es, description_es');
        
        if (error) {
          console.error('Error fetching property translations:', error);
          setHasError(true);
          toast({
            title: 'Translation Error',
            description: 'Could not load property translations. Using default values.',
            variant: 'destructive',
          });
          return;
        }
        
        // Convert data array to a map keyed by property_id
        const translationsMap: Record<string, any> = {};
        if (data && data.length > 0) {
          data.forEach(item => {
            translationsMap[item.property_id] = item;
          });
          setPropertyTranslations(translationsMap);
        } else {
          console.log('No property translations found');
        }
      } catch (error) {
        console.error('Error in fetching property translations:', error);
        setHasError(true);
        toast({
          title: 'Translation Error',
          description: 'Could not load property translations. Using default values.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPropertyTranslations();
  }, [toast]);

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
          
          {hasError && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                Could not load property translations. Showing default content.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex justify-end mb-8">
            <Select value={location} onValueChange={handleLocationChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('properties.filterByLocation')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('properties.allLocations')}</SelectItem>
                <SelectItem value="bali">Bali</SelectItem>
                <SelectItem value="tulum">Tulum</SelectItem>
                <SelectItem value="costa-rica">Costa Rica</SelectItem>
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
