
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Temporary mock data - in a real app would come from API/backend
const services = {
  products: [
    {
      id: 'balinese-craft',
      title: 'Handcrafted Balinese Textiles',
      description: 'Authentic hand-woven textiles made by local Balinese artisans using traditional techniques passed down through generations.',
      image: 'https://images.unsplash.com/photo-1621812956658-78796291dc2e?q=80&w=2670&auto=format&fit=crop',
      price: 120,
      category: 'products'
    },
    {
      id: 'tulum-pottery',
      title: 'Artisanal Mexican Pottery',
      description: 'Beautiful handmade pottery crafted by local Mexican artisans, featuring traditional designs and techniques.',
      image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2669&auto=format&fit=crop',
      price: 95,
      category: 'products'
    },
    {
      id: 'bali-woodcarving',
      title: 'Traditional Balinese Wood Carvings',
      description: 'Exquisite hand-carved wooden sculptures and decorative items created by skilled Balinese woodcarvers.',
      image: 'https://images.unsplash.com/photo-1584283092092-a9c90507cb65?q=80&w=2670&auto=format&fit=crop',
      price: 150,
      category: 'products'
    },
    {
      id: 'tulum-dreamcatcher',
      title: 'Mayan Dream Catchers',
      description: 'Handcrafted dream catchers made by local Mayan artisans using traditional techniques and natural materials.',
      image: 'https://images.unsplash.com/photo-1514047413421-005d8841293e?q=80&w=2574&auto=format&fit=crop',
      price: 75,
      category: 'products'
    }
  ],
  activities: [
    {
      id: 'balinese-massage',
      title: 'Traditional Balinese Massage',
      description: 'Experience the healing touch of Balinese massage in the comfort of your villa, performed by skilled local therapists.',
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2670&auto=format&fit=crop',
      price: 85,
      category: 'activities'
    },
    {
      id: 'bali-cooking',
      title: 'Balinese Cooking Class',
      description: 'Learn to prepare authentic Balinese dishes with a private chef using fresh local ingredients from the morning market.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2670&auto=format&fit=crop',
      price: 120,
      category: 'activities'
    },
    {
      id: 'cenote-dive',
      title: 'Private Cenote Diving Experience',
      description: 'Exclusive guided diving tour of hidden cenotes near Tulum with a professional diver. Explore crystal clear waters and unique cave formations.',
      image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2670&auto=format&fit=crop',
      price: 180,
      category: 'activities'
    },
    {
      id: 'tulum-yoga',
      title: 'Beachfront Yoga Session',
      description: 'Start your day with a private yoga session on the beach, led by experienced local instructors against the backdrop of the Caribbean Sea.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2622&auto=format&fit=crop',
      price: 65,
      category: 'activities'
    }
  ],
  guides: [
    {
      id: 'mayan-guide',
      title: 'Mayan Heritage Tour with Local Guide',
      description: 'Discover the rich cultural history of Tulum with a knowledgeable local guide of Mayan descent. Visit ancient ruins and sacred sites.',
      image: 'https://images.unsplash.com/photo-1605217613423-0aea4fb32906?q=80&w=2670&auto=format&fit=crop',
      price: 150,
      category: 'guides'
    },
    {
      id: 'bali-temple-guide',
      title: 'Sacred Temples Tour with Balinese Guide',
      description: 'Explore Bali\'s most significant temples with a local guide who will explain the cultural and spiritual significance of each site.',
      image: 'https://images.unsplash.com/photo-1604922824961-87cefb9dc1ce?q=80&w=2574&auto=format&fit=crop',
      price: 130,
      category: 'guides'
    },
    {
      id: 'tulum-foodie-tour',
      title: 'Tulum Culinary Explorer',
      description: 'A guided tour of Tulum\'s best local eateries and food markets with a culinary expert who will introduce you to authentic Mexican flavors.',
      image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=2535&auto=format&fit=crop',
      price: 110,
      category: 'guides'
    },
    {
      id: 'bali-art-tour',
      title: 'Ubud Art and Craft Villages Tour',
      description: 'Visit the artistic heart of Bali with a guide who will take you to the best galleries, workshops, and craft villages around Ubud.',
      image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2670&auto=format&fit=crop',
      price: 120,
      category: 'guides'
    }
  ]
};

const allServices = [...services.products, ...services.activities, ...services.guides];

const Services = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredServices = activeTab === 'all' 
    ? allServices
    : services[activeTab as keyof typeof services];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
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
            
            <Tabs defaultValue="all" className="mb-12" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-center">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-xl">
                  <TabsTrigger value="all">All Services</TabsTrigger>
                  <TabsTrigger value="products">Artisan Products</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                  <TabsTrigger value="guides">Local Guides</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {allServices.map((service) => (
                    <ServiceCard 
                      key={service.id}
                      {...service}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="products" className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.products.map((service) => (
                    <ServiceCard 
                      key={service.id}
                      {...service}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="activities" className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.activities.map((service) => (
                    <ServiceCard 
                      key={service.id}
                      {...service}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="guides" className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.guides.map((service) => (
                    <ServiceCard 
                      key={service.id}
                      {...service}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Custom Services CTA */}
        <section className="py-20 px-6 md:px-8 lg:px-12 bg-terra-light">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-4">
                  <span className="bg-terra-dark text-white text-xs font-medium px-2.5 py-1 rounded">Personalized Service</span>
                </div>
                <h2 className="heading-md mb-6">Can't Find What You're Looking For?</h2>
                <p className="paragraph text-muted-foreground mb-6">
                  Our concierge team specializes in creating custom experiences tailored to your preferences.
                  Whether you're looking for a special celebration, a unique cultural experience, or
                  specific artisanal products, we're here to help.
                </p>
                <Button asChild size="lg">
                  <a href="#" className="inline-block">Contact Our Concierge</a>
                </Button>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <AnimatedImage
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2670&auto=format&fit=crop"
                  alt="Custom experiences"
                  className="h-full w-full"
                  hoverEffect="glow"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
