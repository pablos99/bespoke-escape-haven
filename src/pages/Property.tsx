
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AnimatedImage } from '@/components/ui/AnimatedImage';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { supabase } from '@/integrations/supabase/client';

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
    image: "https://images.unsplash.com/photo-1621812956658-78796291dc2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
  const { language, t } = useApp();
  const [translation, setTranslation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch property translation from Supabase
  useEffect(() => {
    async function fetchPropertyTranslation() {
      if (!propertyId) return;
      
      try {
        const { data, error } = await supabase
          .from('property_translations')
          .select('*')
          .eq('property_id', propertyId)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching property translation:', error);
          return;
        }
        
        if (data) {
          setTranslation(data);
        }
      } catch (error) {
        console.error('Error in fetching property translation:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPropertyTranslation();
  }, [propertyId]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading property details...</div>;
  }

  // Helper function to get localized content
  const getLocalizedContent = (key: 'name' | 'description' | 'longDescription') => {
    if (!translation) return property[key];
    
    if (key === 'name') {
      return translation[`title_${language}`] || property.name;
    } else if (key === 'description' || key === 'longDescription') {
      return translation[`description_${language}`] || property[key];
    }
    
    return property[key];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Property Images Gallery */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden">
              <AnimatedImage
                src={property.images[0]}
                alt={getLocalizedContent('name')}
                className="h-full w-full"
                hoverEffect="zoom"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {property.images.slice(1, 5).map((image, index) => (
                <div key={index} className="aspect-[4/3] rounded-xl overflow-hidden">
                  <AnimatedImage
                    src={image}
                    alt={`${getLocalizedContent('name')} - View ${index + 2}`}
                    className="h-full w-full"
                    hoverEffect="zoom"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Property Details */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="heading-lg">{getLocalizedContent('name')}</h1>
                  <p className="text-muted-foreground">{property.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold">${property.price}<span className="text-sm text-muted-foreground">/{t('booking.night')}</span></p>
                  <div className="flex items-center justify-end mt-1">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{property.rating}</span>
                    <span className="mx-1">·</span>
                    <span className="text-muted-foreground">{property.reviewCount} {t('property.reviews')}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                {property.highlights.map((highlight, index) => (
                  <div key={index} className="bg-secondary/30 p-6 rounded-xl">
                    <h3 className="text-lg font-medium mb-2">{highlight.title}</h3>
                    <p className="text-muted-foreground">{highlight.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="prose prose-lg max-w-none my-8">
                <p>{getLocalizedContent('longDescription')}</p>
              </div>
              
              <div className="my-12">
                <h2 className="heading-md mb-6">{t('property.amenities')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-4">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="my-12">
                <h2 className="heading-md mb-6">{t('property.meetHost')}</h2>
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-6">
                    <img src={property.host.image} alt={property.host.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">{property.host.name}</h3>
                    <p className="text-muted-foreground">{property.host.description}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-background border border-border rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-medium mb-6">{t('property.bookStay')}</h3>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">{t('property.checkIn')}</label>
                  <input type="date" className="w-full border border-border rounded-md p-2" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">{t('property.checkOut')}</label>
                  <input type="date" className="w-full border border-border rounded-md p-2" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">{t('property.guests')}</label>
                  <select className="w-full border border-border rounded-md p-2">
                    <option>1 {t('property.guest')}</option>
                    <option>2 {t('property.guests')}</option>
                    <option>3 {t('property.guests')}</option>
                    <option>4 {t('property.guests')}</option>
                    <option>5+ {t('property.guests')}</option>
                  </select>
                </div>
                <Button className="w-full mb-4">{t('buttons.bookNow')}</Button>
                <p className="text-center text-sm text-muted-foreground">{t('property.noChargeYet')}</p>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex justify-between mb-2">
                    <span>${property.price} × 5 {t('property.nights')}</span>
                    <span>${property.price * 5}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>{t('property.cleaningFee')}</span>
                    <span>$75</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>{t('property.serviceFee')}</span>
                    <span>$120</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-4 border-t border-border mt-4">
                    <span>{t('property.total')}</span>
                    <span>${property.price * 5 + 75 + 120}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Reviews Section */}
        <section className="container mx-auto px-4 py-12 border-t border-border">
          <h2 className="heading-md mb-8 flex items-center">
            <span className="text-yellow-500 mr-2">★</span>
            {property.rating} · {property.reviewCount} {t('property.reviews')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-background border border-border rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img src={review.image} alt={review.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium">{review.author}</h3>
                    <p className="text-sm text-muted-foreground">{review.location}</p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-muted-foreground">{review.content}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline">{t('buttons.viewAllReviews')}</Button>
          </div>
        </section>
        
        {/* Related Services */}
        <section className="container mx-auto px-4 py-12 border-t border-border">
          <h2 className="heading-md mb-8">{t('property.bespokeServices')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedServices.map((service) => (
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
      </main>
      
      <Footer />
    </div>
  );
}
