
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { ArrowRight } from 'lucide-react';

const featuredServices = [
  {
    id: 'balinese-craft',
    title: 'Handcrafted Balinese Textiles',
    description: 'Authentic hand-woven textiles made by local Balinese artisans using traditional techniques passed down through generations.',
    image: 'https://images.unsplash.com/photo-1621812956658-78796291dc2e?q=80&w=2670&auto=format&fit=crop',
    price: 120,
    category: 'products' as const
  },
  {
    id: 'cenote-dive',
    title: 'Private Cenote Diving Experience',
    description: 'Exclusive guided diving tour of hidden cenotes near Tulum with a professional diver. Explore crystal clear waters and unique cave formations.',
    image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2670&auto=format&fit=crop',
    price: 180,
    category: 'activities' as const
  },
  {
    id: 'mayan-guide',
    title: 'Mayan Heritage Tour with Local Guide',
    description: 'Discover the rich cultural history of Tulum with a knowledgeable local guide of Mayan descent. Visit ancient ruins and sacred sites.',
    image: 'https://images.unsplash.com/photo-1605217613423-0aea4fb32906?q=80&w=2670&auto=format&fit=crop',
    price: 150,
    category: 'guides' as const
  }
];

export function ServicesSection() {
  return (
    <section className="py-20 px-6 md:px-8 lg:px-12 bg-ocean-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-lg mb-4 text-foreground">Bespoke Services</h2>
          <p className="paragraph text-foreground/80">
            Enhance your stay with our curated selection of local artisan products,
            unique experiences, and knowledgeable guides.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service) => (
            <ServiceCard 
              key={service.id}
              {...service}
              className="animate-fade-up opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: `${featuredServices.indexOf(service) * 100}ms` }}
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
  );
}
