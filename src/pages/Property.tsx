import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/contexts/TranslationContext';
import { supabase } from '@/integrations/supabase/client';
import { PropertyGallery } from '@/components/property/PropertyGallery';
import { PropertyContent } from '@/components/property/PropertyContent';
import { PropertyReviews } from '@/components/property/PropertyReviews';
import { PropertyRelatedServices } from '@/components/property/PropertyRelatedServices';
import { PropertyLoader } from '@/components/property/PropertyLoader';
import { ErrorAlert } from '@/components/property/ErrorAlert';
import { useToast } from '@/hooks/use-toast';
import { usePropertyById } from '@/hooks/usePropertyById';

// Mock property data - in a real app would be fetched from API
const property = {
  id: "bali-villa",
  name: "Tropical Balinese Villa",
  location: "Ubud, Bali",
  price: 245,
  rating: 4.97,
  reviewCount: 128,
  description: "Nestled in the lush rice terraces of Ubud, this traditional Balinese villa offers tranquility and authentic cultural experiences. The open-air design connects you with nature while modern amenities ensure a comfortable stay.",
  longDescription: "Experience the serene beauty of Bali in this authentic villa that embodies the island's rich architectural heritage. The villa features hand-carved wooden details, a private infinity pool overlooking the jungle, and a meditation pavilion.\n\nThe spacious indoor-outdoor living area is perfect for relaxing to the sounds of nature, while the fully equipped kitchen allows you to prepare meals with fresh ingredients from the local market. Each bedroom opens to stunning views, with luxury linens and traditional Balinese textiles.\n\nOur dedicated staff includes a private chef, daily housekeeping, and a personal concierge to arrange any experiences you desire. The villa is just a 15-minute drive from central Ubud, offering both seclusion and convenience.",
  amenities: [
    "Private infinity pool",
    "Open-air living area",
    "Fully equipped kitchen",
    "Daily housekeeping",
    "Personal chef (available upon request)",
    "Free Wi-Fi",
    "Air conditioning",
    "Yoga deck",
    "Garden shower",
    "Complimentary breakfast"
  ],
  images: [
    "https://images.unsplash.com/photo-1570211776045-af3a51026f4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  ],
  highlights: [
    {
      title: "Tranquil Setting",
      description: "Surrounded by lush jungle and rice paddies, offering complete privacy and peaceful ambiance"
    },
    {
      title: "Cultural Immersion",
      description: "Traditional Balinese architecture with authentic local arts and crafts throughout"
    },
    {
      title: "Premium Location",
      description: "Just 15 minutes from central Ubud, with complimentary shuttle service available"
    }
  ],
  host: {
    name: "Maya",
    description: "Passionate about Balinese culture and sustainable tourism",
    image: "https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
};

// Mock related services
const relatedServices = [
  {
    id: "balinese-massage",
    title: "Traditional Balinese Massage",
    description: "Experience the healing touch of Balinese massage in the comfort of your villa, performed by skilled local therapists.",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 85,
    category: "activities" as const
  },
  {
    id: "balinese-craft",
    title: "Handcrafted Balinese Textiles",
    description: "Authentic hand-woven textiles made by local Balinese artisans using traditional techniques passed down through generations.",
    image: "https://images.unsplash.com/photo-1621812956658-78796291dc2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 120,
    category: "products" as const
  },
  {
    id: "bali-temple-guide",
    title: "Sacred Temples Tour with Balinese Guide",
    description: "Explore Bali's most significant temples with a local guide who will explain the cultural and spiritual significance of each site.",
    image: "https://images.unsplash.com/photo-1604922824961-87cefb9dc1ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 130,
    category: "guides" as const
  }
];

// Reviews data
const reviews = [
  {
    id: "review1",
    author: "Sarah & James",
    location: "New York, USA",
    date: "July 2023",
    rating: 5,
    content: "This villa exceeded all our expectations. The staff was incredibly attentive, the views were breathtaking, and the location was perfect - secluded but still accessible. We particularly enjoyed the private chef who prepared the most amazing local dishes for us. Can't wait to return!",
    image: "https://images.unsplash.com/photo-1484712401471-05c7215830eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "review2",
    author: "Thomas",
    location: "London, UK",
    date: "May 2023",
    rating: 5,
    content: "A truly magical experience. Waking up to the sounds of nature, swimming in the infinity pool while overlooking the jungle, and enjoying the beautiful Balinese design - it was all perfect. Maya was an exceptional host who arranged a wonderful private yoga session for us.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "review3",
    author: "Emma & David",
    location: "Melbourne, Australia",
    date: "April 2023",
    rating: 4,
    content: "We loved our stay at this beautiful villa. The architecture and design are stunning, and the staff was very attentive. The only minor issue was that the Wi-Fi was a bit unreliable, but that actually helped us disconnect and enjoy our vacation more fully!",
    image: "https://images.unsplash.com/photo-1499887142886-791eca5918cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];

export default function Property() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { language } = useApp();
  const { t, setCurrentPage } = useTranslation();
  const [translation, setTranslation] = useState<any>(null);
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();
  
  // Use our custom hook to fetch property data
  const { data: propertyData, isLoading, error: propertyError } = usePropertyById(propertyId);

  // Set the current page for translations
  useEffect(() => {
    setCurrentPage('property');
  }, [setCurrentPage]);

  // Fetch property translation from Supabase
  useEffect(() => {
    async function fetchPropertyTranslation() {
      if (!propertyId) return;
      
      try {
        setHasError(false);
        
        const { data, error } = await supabase
          .from('property_translations')
          .select('*')
          .eq('property_id', propertyId)
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching property translation:', error);
          setHasError(true);
          toast({
            title: 'Error loading property data',
            description: 'Using default property information',
            variant: 'destructive',
          });
          return;
        }
        
        if (data) {
          setTranslation(data);
        } else {
          console.log(`No translation found for property: ${propertyId}`);
        }
      } catch (error) {
        console.error('Error in fetching property translation:', error);
        setHasError(true);
        toast({
          title: 'Error loading property data',
          description: 'Using default property information',
          variant: 'destructive',
        });
      }
    }
    
    fetchPropertyTranslation();
  }, [propertyId, toast]);

  // Helper function to get localized content
  const getLocalizedContent = (key: 'name' | 'description' | 'longDescription') => {
    // First try to get from database
    if (propertyData && key === 'name') {
      return propertyData.title || property.name;
    }
    
    if (propertyData && (key === 'description' || key === 'longDescription')) {
      return propertyData.description || property[key];
    }
    
    // Then fall back to translations
    if (!translation) return property[key];
    
    if (key === 'name') {
      return translation[`title_${language}`] || property.name;
    } else if (key === 'description' || key === 'longDescription') {
      return translation[`description_${language}`] || property[key];
    }
    
    return property[key];
  };

  if (isLoading) {
    return <PropertyLoader />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <ErrorAlert hasError={hasError} propertyError={propertyError} />
        
        {/* Property Images Gallery */}
        <PropertyGallery 
          images={propertyData?.property_images?.length > 0 
            ? propertyData.property_images.map((img: any) => img.image_url) 
            : property.images} 
          propertyName={getLocalizedContent('name')} 
        />
        
        {/* Property Content Section */}
        <PropertyContent
          propertyId={propertyId || property.id}
          name={getLocalizedContent('name')}
          location={propertyData?.city ? `${propertyData.city}, ${propertyData.country}` : property.location}
          price={propertyData?.price_per_share || property.price}
          rating={property.rating}
          reviewCount={property.reviewCount}
          longDescription={getLocalizedContent('longDescription')}
          highlights={property.highlights}
          amenities={property.amenities}
          host={property.host}
          t={t}
        />
        
        {/* Reviews Section */}
        <PropertyReviews
          reviews={reviews}
          rating={property.rating}
          reviewCount={property.reviewCount}
        />
        
        {/* Related Services */}
        <PropertyRelatedServices services={relatedServices} />
      </main>
      
      <Footer />
    </div>
  );
}
