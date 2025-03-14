import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { AnimatedImage } from '@/components/ui/AnimatedImage';
import { ArrowRight, MapPin } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

const baliProperties = [
  {
    id: 'bali-villa',
    title: 'Beachfront Villa',
    location: 'Canggu, Bali',
    description: 'A stunning beachfront villa with panoramic ocean views, infinity pool, and lush tropical gardens. Perfect for a luxury getaway in paradise.',
    image: 'https://images.unsplash.com/photo-1570737209810-87a8e7245f88?q=80&w=2532&auto=format&fit=crop',
    rating: 4.9,
    price: 350
  },
  {
    id: 'ubud-retreat',
    title: 'Jungle Retreat',
    location: 'Ubud, Bali',
    description: 'Nestled in the lush jungle with views of rice terraces. Features a private pool, open-air living, and sustainable bamboo architecture.',
    image: 'https://images.unsplash.com/photo-1537344045449-538f2a4767a0?q=80&w=2670&auto=format&fit=crop',
    rating: 4.8,
    price: 275
  }
];

const baliActivities = [
  {
    id: 'balinese-craft',
    title: 'Handcrafted Balinese Textiles',
    description: 'Authentic hand-woven textiles made by local Balinese artisans using traditional techniques passed down through generations.',
    image: 'https://images.unsplash.com/photo-1621812956658-78796291dc2e?q=80&w=2670&auto=format&fit=crop',
    price: 120,
    category: 'products' as const
  },
  {
    id: 'rice-field-trek',
    title: 'Guided Rice Terrace Trek',
    description: 'Explore the stunning Tegallalang rice terraces with a local guide who will explain the traditional Subak irrigation system.',
    image: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?q=80&w=2574&auto=format&fit=crop',
    price: 95,
    category: 'guides' as const
  },
  {
    id: 'bali-cooking',
    title: 'Traditional Balinese Cooking Class',
    description: 'Learn to prepare authentic Balinese dishes with a local chef in a traditional outdoor kitchen surrounded by rice fields.',
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?q=80&w=2574&auto=format&fit=crop',
    price: 85,
    category: 'activities' as const
  }
];

const baliHighlights = [
  {
    title: 'Tegallalang Rice Terraces',
    description: 'Stunning terraced rice fields that showcase the traditional Balinese cooperative irrigation system known as subak.',
    image: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?q=80&w=2574&auto=format&fit=crop'
  },
  {
    title: 'Uluwatu Temple',
    description: 'Ancient sea temple perched dramatically on a steep cliff 70 meters above the Indian Ocean. Famous for its Kecak fire dance performances at sunset.',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=2574&auto=format&fit=crop'
  },
  {
    title: 'Sacred Monkey Forest',
    description: 'Natural sanctuary home to over 700 Balinese long-tailed macaques and three ancient temples dating back to the 14th century.',
    image: 'https://images.unsplash.com/photo-1584290867415-527a8475726a?q=80&w=2670&auto=format&fit=crop'
  },
  {
    title: 'Ubud Art Market',
    description: 'Colorful local market where Balinese artisans sell handmade crafts, textiles, baskets, and other unique souvenirs.',
    image: 'https://images.unsplash.com/photo-1580385271092-237af271b731?q=80&w=2574&auto=format&fit=crop'
  }
];

export default function Bali() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero 
          title={t('cities.bali.title')}
          subtitle={t('cities.bali.subtitle')}
          backgroundImage="https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=2650&auto=format&fit=crop"
        />
        
        {/* About Bali Section */}
        <section className="py-20 px-6 md:px-8 lg:px-12" id="about-bali">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="heading-lg mb-6">Island of the Gods</h2>
                <p className="paragraph text-muted-foreground mb-6">
                  Bali enchants with its dramatic dances and colorful ceremonies, its arts and crafts, to its luxurious beach resorts and exciting nightlife. And everywhere, you'll find intricately carved temples.
                </p>
                <p className="paragraph text-muted-foreground mb-8">
                  Known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs, Bali is home to religious sites such as cliffside Uluwatu Temple. The island is also known for its yoga and meditation retreats.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <a href="#bali-properties">View Properties</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="#bali-experiences">Explore Experiences</a>
                  </Button>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="grid grid-cols-2 gap-4">
                  <AnimatedImage
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2574&auto=format&fit=crop"
                    alt="Bali Temple"
                    className="rounded-xl aspect-[3/4] object-cover w-full"
                    hoverEffect="glow"
                  />
                  <AnimatedImage
                    src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=2574&auto=format&fit=crop"
                    alt="Bali Beach"
                    className="rounded-xl aspect-[3/4] object-cover w-full"
                    hoverEffect="glow"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Properties Section */}
        <section className="py-20 px-6 md:px-8 lg:px-12 bg-sand-light" id="bali-properties">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <h2 className="heading-lg mb-4">Our Bali Villas</h2>
                <p className="paragraph text-muted-foreground">
                  Exclusive properties in Bali's most coveted locations.
                </p>
              </div>
              <div className="mt-6 md:mt-0">
                <Button asChild variant="outline">
                  <Link to="/properties" className="flex items-center">
                    {t('button.exploreProperties')}
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {baliProperties.map((property) => (
                <PropertyCard 
                  key={property.id}
                  {...property}
                  className="animate-fade-up opacity-0 [animation-fill-mode:forwards]"
                  style={{ animationDelay: `${baliProperties.indexOf(property) * 100}ms` }}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Experiences Section */}
        <section className="py-20 px-6 md:px-8 lg:px-12" id="bali-experiences">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-lg mb-4">Bali Experiences</h2>
              <p className="paragraph text-muted-foreground">
                Immerse yourself in Balinese culture with our curated experiences and services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {baliActivities.map((activity) => (
                <ServiceCard 
                  key={activity.id}
                  {...activity}
                  className="animate-fade-up opacity-0 [animation-fill-mode:forwards]"
                  style={{ animationDelay: `${baliActivities.indexOf(activity) * 100}ms` }}
                />
              ))}
            </div>
            
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
        
        {/* Highlights Section */}
        <section className="py-20 px-6 md:px-8 lg:px-12 bg-ocean-light" id="bali-highlights">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-lg mb-4">Bali Highlights</h2>
              <p className="paragraph text-muted-foreground">
                Must-visit attractions and experiences in the Island of the Gods.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {baliHighlights.map((highlight, index) => (
                <div 
                  key={index}
                  className="bg-background rounded-xl overflow-hidden shadow-md flex flex-col"
                >
                  <div className="h-64 overflow-hidden">
                    <AnimatedImage
                      src={highlight.image}
                      alt={highlight.title}
                      className="w-full h-full object-cover"
                      hoverEffect="zoom"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{highlight.title}</h3>
                    <p className="text-muted-foreground">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-20 px-6 md:px-8 lg:px-12" id="bali-map">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-lg mb-4">Discover Bali</h2>
              <p className="paragraph text-muted-foreground">
                Our properties are located in the most desirable areas of Bali.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-muted rounded-xl overflow-hidden aspect-[4/3] relative">
                <MapPin className="text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={32} />
                <div className="absolute inset-0">
                  <img 
                    src="https://images.unsplash.com/photo-1572555641358-3a4040b72c6e?q=80&w=2574&auto=format&fit=crop"
                    alt="Bali map"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              </div>
              <div>
                <h3 className="heading-md mb-4">Our Locations</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin size={20} className="mr-2 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Canggu</h4>
                      <p className="text-muted-foreground">
                        A laid-back coastal village known for its surf beaches, rice paddies, and relaxed atmosphere. Home to our beachfront villas.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <MapPin size={20} className="mr-2 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Ubud</h4>
                      <p className="text-muted-foreground">
                        The cultural heart of Bali, surrounded by rainforests and terraced rice paddies, dotted with temples and shrines. Our jungle retreats offer tranquility in this spiritual setting.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <MapPin size={20} className="mr-2 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Seminyak</h4>
                      <p className="text-muted-foreground">
                        An upscale area with luxury resorts, high-end shopping, and fine dining. Our boutique properties here offer exclusivity and elegance.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
