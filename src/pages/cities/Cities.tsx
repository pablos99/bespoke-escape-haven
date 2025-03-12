
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Button } from '@/components/ui/button';
import { AnimatedImage } from '@/components/ui/AnimatedImage';
import { ArrowRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const destinations = [
  {
    id: 'bali',
    name: 'Bali, Indonesia',
    description: 'Island of the Gods with lush landscapes, stunning beaches, and rich cultural heritage.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2574&auto=format&fit=crop',
    link: '/cities/bali'
  },
  {
    id: 'tulum',
    name: 'Tulum, Mexico',
    description: 'Where ancient Mayan ruins meet pristine Caribbean beaches and lush jungle.',
    image: 'https://images.unsplash.com/photo-1635239381733-ece45d0caf57?q=80&w=2574&auto=format&fit=crop',
    link: '/cities/tulum'
  }
];

export default function Cities() {
  const { t } = useApp();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <section className="py-24 px-6 md:px-8 lg:px-12" id="destinations">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="heading-xl mb-6">Our Destinations</h1>
              <p className="paragraph-lg text-muted-foreground">
                Discover our handpicked luxury properties in two of the world's most beautiful destinations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {destinations.map((destination) => (
                <div 
                  key={destination.id}
                  className="group relative rounded-xl overflow-hidden"
                  id={`destination-${destination.id}`}
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <AnimatedImage
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                    <h2 className="text-3xl font-medium text-white mb-2">{destination.name}</h2>
                    <p className="text-white/90 mb-6 max-w-md">{destination.description}</p>
                    <Button asChild className="w-fit">
                      <Link to={destination.link} className="flex items-center">
                        Explore
                        <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-secondary rounded-xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="heading-md mb-6">Why We Chose These Destinations</h2>
                  <p className="paragraph text-muted-foreground mb-6">
                    We selected Bali and Tulum not only for their natural beauty but for their unique blend of culture, cuisine, and commitment to preserving local traditions.
                  </p>
                  <p className="paragraph text-muted-foreground mb-8">
                    Each location offers a different perspective on sustainable luxury and authentic experiences that connect our guests with the heart and soul of these remarkable places.
                  </p>
                </div>
                <div className="rounded-xl overflow-hidden">
                  <AnimatedImage
                    src="https://images.unsplash.com/photo-1587970701722-a7f27649410b?q=80&w=2574&auto=format&fit=crop"
                    alt="Beach at sunset"
                    className="w-full h-auto"
                    hoverEffect="zoom"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-24 px-6 md:px-8 lg:px-12 bg-sand-light" id="experiences">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="grid grid-cols-2 gap-4">
                <AnimatedImage
                  src="https://images.unsplash.com/photo-1582610116397-edb318620f90?q=80&w=2574&auto=format&fit=crop"
                  alt="Oceanfront villa"
                  className="rounded-xl aspect-square object-cover w-full"
                  hoverEffect="glow"
                />
                <AnimatedImage
                  src="https://images.unsplash.com/photo-1577948000111-9c970dfe3743?q=80&w=2574&auto=format&fit=crop"
                  alt="Rice terraces"
                  className="rounded-xl aspect-square object-cover w-full"
                  hoverEffect="glow"
                />
                <AnimatedImage
                  src="https://images.unsplash.com/photo-1605217613423-0aea4fb32906?q=80&w=2670&auto=format&fit=crop"
                  alt="Mayan ruins"
                  className="rounded-xl aspect-square object-cover w-full"
                  hoverEffect="glow"
                />
                <AnimatedImage
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2670&auto=format&fit=crop"
                  alt="Beach cabana"
                  className="rounded-xl aspect-square object-cover w-full"
                  hoverEffect="glow"
                />
              </div>
              <div>
                <h2 className="heading-lg mb-6">Crafting Unforgettable Experiences</h2>
                <p className="paragraph text-muted-foreground mb-6">
                  Our properties are designed to be more than just a place to stay—they're gateways to authentic cultural immersion and unforgettable adventures.
                </p>
                <p className="paragraph text-muted-foreground mb-8">
                  Whether you're seeking serenity in Bali's emerald rice terraces or adventure exploring Tulum's ancient ruins and crystalline cenotes, we've curated the perfect setting for your journey.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link to="/properties">View All Properties</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/services">Explore Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-24 px-6 md:px-8 lg:px-12" id="cta">
          <div className="max-w-7xl mx-auto">
            <div className="bg-background border border-border rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative min-h-[400px]">
                  <img 
                    src="https://images.unsplash.com/photo-1570737209810-87a8e7245f88?q=80&w=2532&auto=format&fit=crop"
                    alt="Luxury Villa"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="heading-md mb-6">Ready to Begin Your Journey?</h2>
                  <p className="paragraph text-muted-foreground mb-8">
                    Whether you're drawn to the spiritual energy of Bali or the bohemian charm of Tulum, your perfect getaway awaits. Book now to secure your stay in paradise.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild size="lg">
                      <Link to="/booking">Book Your Stay</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
