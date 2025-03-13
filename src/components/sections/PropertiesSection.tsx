
import React from 'react';
import { Link } from 'react-router-dom';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Temporary mock data - in a real app would come from API/backend
const properties = [
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
    id: 'tulum-retreat',
    title: 'Jungle Retreat',
    location: 'Tulum, Mexico',
    description: 'Nestled in the lush jungle just minutes from Tulum\'s pristine beaches. Features a private cenote, open-air living, and sustainable design.',
    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2670&auto=format&fit=crop',
    rating: 4.8,
    price: 295
  }
];

export function PropertiesSection() {
  return (
    <section className="py-20 px-6 md:px-8 lg:px-12 bg-sand-light">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="heading-lg mb-4 text-foreground">Our Exclusive Properties</h2>
            <p className="paragraph text-foreground/80">
              Handpicked luxury retreats in the most beautiful locations.
              Each property offers a unique experience with personalized services.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button asChild variant="outline">
              <Link to="/properties" className="flex items-center">
                View All Properties
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {properties.map((property) => (
            <PropertyCard 
              key={property.id}
              {...property}
              className="animate-fade-up opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: `${properties.indexOf(property) * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
