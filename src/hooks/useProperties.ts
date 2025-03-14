
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Fallback properties if Supabase data fails to load
const fallbackProperties = [
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
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
      "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1628744424121-c9dfe5285ada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    ],
    price: 380,
    features: ["2 Bedrooms", "Glass Walls", "Canopy Hot Tub", "Birdwatching Deck", "Gourmet Breakfast"],
    rating: 4.8,
    locationFilter: "costa-rica",
  }
];

export type Property = {
  id: string;
  title: string;
  location: string;
  description: string;
  images: string[];
  price: number;
  rating: number;
  locationFilter: string;
  features?: string[];
};

export const useProperties = (locationFilter: string = 'all') => {
  const { toast } = useToast();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  // Fetch properties from Supabase
  const { data: supabaseProperties, isLoading, error: propertiesError } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*, property_images(image_url, is_primary)')
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data || [];
    }
  });

  // Process properties data to match our UI needs
  const processedProperties = useMemo(() => {
    if (!supabaseProperties || supabaseProperties.length === 0) {
      return fallbackProperties;
    }

    return supabaseProperties.map(property => {
      // Find primary image or use first image or a placeholder
      const propertyImages = property.property_images || [];
      const primaryImage = propertyImages.find((img: any) => img.is_primary);
      const firstImage = propertyImages[0];
      const imageUrl = primaryImage ? 
        primaryImage.image_url : 
        (firstImage ? firstImage.image_url : 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2');
      
      return {
        id: property.id,
        title: property.title,
        location: `${property.city}, ${property.country}`,
        description: property.description,
        images: [imageUrl],
        price: property.price_per_share,
        rating: 4.8, // Hardcoded for now, could be fetched from reviews table
        locationFilter: property.country.toLowerCase().replace(/\s+/g, '-'),
      };
    });
  }, [supabaseProperties]);

  // Filter properties based on location
  useEffect(() => {
    const properties = processedProperties || fallbackProperties;
    
    if (locationFilter === "all") {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(properties.filter(property => 
        property.locationFilter === locationFilter || 
        property.locationFilter.includes(locationFilter)
      ));
    }
  }, [locationFilter, processedProperties]);

  if (propertiesError) {
    console.error('Error loading properties:', propertiesError);
    toast({
      title: 'Error',
      description: 'Failed to load properties. Using default data.',
      variant: 'destructive',
    });
  }

  return {
    properties: filteredProperties,
    isLoading,
    hasError: !!propertiesError
  };
};
