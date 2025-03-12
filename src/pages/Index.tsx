
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { Button } from '@/components/ui/button';
import { AnimatedImage } from '@/components/ui/AnimatedImage';
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

const featuredServices = [
  {
    id: 'balinese-craft',
    title: 'Handcrafted Balinese Textiles',
    description: 'Authentic hand-woven textiles made by local Balinese artisans using traditional techniques passed down through generations.',
    image: 'https://images.unsplash.com/photo-1621812956658-78796291dc2e?q=80&w=2670&auto=format&fit=crop',
    price: 120,
    category: 'products'
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
    id: 'mayan-guide',
    title: 'Mayan Heritage Tour with Local Guide',
    description: 'Discover the rich cultural history of Tulum with a knowledgeable local guide of Mayan descent. Visit ancient ruins and sacred sites.',
    image: 'https://images.unsplash.com/photo-1605217613423-0aea4fb32906?q=80&w=2670&auto=format&fit=crop',
    price: 150,
    category: 'guides'
  }
];

const reviews = [
  {
    name: 'Sophie Williams',
    location: 'London, UK',
    date: 'March 2023',
    rating: 5,
    content: 'Our stay at the Bali villa was absolutely magical. The staff were attentive, the property stunning, and the bespoke experiences arranged for us made this trip unforgettable.'
  },
  {
    name: 'James Rodriguez',
    location: 'New York, USA',
    date: 'January 2023',
    rating: 5,
    content: 'The Tulum retreat exceeded all expectations. The jungle setting was serene yet we were just minutes from the beach. The local guide recommended to us was incredibly knowledgeable.'
  },
  {
    name: 'Emma Chen',
    location: 'Sydney, Australia',
    date: 'February 2023',
    rating: 4,
    content: 'Beautiful properties and excellent service. The artisan products we purchased through the platform make for perfect souvenirs that remind us of our wonderful stay.'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero 
          title="Luxury Retreats in Paradise"
          subtitle="Experience the perfect blend of comfort, luxury, and authentic local culture in our exclusive Bali and Tulum properties."
          backgroundImage="https://images.unsplash.com/photo-1535916707207-35f97e715e1c?q=80&w=2574&auto=format&fit=crop"
        />
        
        {/* Properties Section */}
        <section className="py-20 px-6 md:px-8 lg:px-12 bg-sand-light">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div className="max-w-2xl">
                <h2 className="heading-lg mb-4">Our Exclusive Properties</h2>
                <p className="paragraph text-muted-foreground">
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
        
        {/* About Section */}
        <section className="py-20 px-6 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 animate-fade-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
                <div className="inline-block mb-4">
                  <span className="bg-ocean-light text-ocean-dark text-xs font-medium px-2.5 py-1 rounded">Our Story</span>
                </div>
                <h2 className="heading-md mb-6">Crafting Unforgettable Experiences in Paradise</h2>
                <p className="paragraph text-muted-foreground mb-6">
                  We curate exceptional stays in Bali and Tulum, connecting you with the authentic soul of each destination.
                  Our properties are more than just places to stay; they're gateways to experiences that
                  celebrate local culture, craftsmanship, and natural beauty.
                </p>
                <p className="paragraph text-muted-foreground mb-8">
                  From arranging private tours with knowledgeable local guides to sourcing handcrafted
                  treasures from skilled artisans, we ensure every aspect of your stay is thoughtfully considered.
                </p>
                <Button asChild>
                  <Link to="/about">Learn More About Us</Link>
                </Button>
              </div>
              <div className="order-1 md:order-2 relative animate-fade-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
                <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
                  <AnimatedImage
                    src="https://images.unsplash.com/photo-1602002418211-9d76470fa71f?q=80&w=2574&auto=format&fit=crop"
                    alt="Luxury villa in Bali"
                    className="h-full w-full"
                    hoverEffect="glow"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-2/3 rounded-xl overflow-hidden shadow-xl">
                  <AnimatedImage
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2574&auto=format&fit=crop"
                    alt="Tulum beach"
                    className="h-full w-full"
                    hoverEffect="glow"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-20 px-6 md:px-8 lg:px-12 bg-ocean-light">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-lg mb-4">Bespoke Services</h2>
              <p className="paragraph text-muted-foreground">
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
        
        {/* Reviews Section */}
        <section className="py-20 px-6 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-lg mb-4">Guest Experiences</h2>
              <p className="paragraph text-muted-foreground">
                Read what our guests have to say about their stays and experiences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <ReviewCard 
                  key={index}
                  {...review}
                  className="animate-fade-up opacity-0 [animation-fill-mode:forwards]"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 md:px-8 lg:px-12 bg-terra-light relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="bg-background rounded-xl p-8 md:p-12 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="heading-md mb-6">Ready to Experience Paradise?</h2>
                  <p className="paragraph text-muted-foreground mb-8">
                    Book your stay at one of our exclusive properties and discover
                    the perfect blend of luxury, culture, and natural beauty.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button asChild size="lg">
                      <Link to="/booking">Book Your Stay</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </div>
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden animate-fade-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
                  <AnimatedImage
                    src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2670&auto=format&fit=crop"
                    alt="Luxury pool"
                    className="h-full w-full"
                    hoverEffect="glow"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
