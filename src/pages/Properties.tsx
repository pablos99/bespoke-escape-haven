
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { PropertyBookingCard } from '@/components/ui/PropertyBookingCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
  },
  {
    id: "tulum-beach",
    title: "Tulum Beach Retreat",
    location: "Tulum, Mexico",
    description: "A stunning beachfront property with breathtaking views of the Caribbean Sea, just steps away from Tulum's pristine beaches.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582610116397-edb318620f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    ],
    price: 320,
    features: ["2 Bedrooms", "Oceanfront", "Rooftop Terrace", "Private Chef", "Bicycle Rental"],
    rating: 4.8,
  },
];

export default function Properties() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <section className="container max-w-6xl mx-auto px-4 mb-16" id="properties-list">
          <div className="text-center mb-10">
            <h1 className="heading-lg mb-4">Our Exclusive Properties</h1>
            <p className="paragraph-lg max-w-3xl mx-auto text-muted-foreground">
              Experience the ultimate in luxury and comfort with our carefully curated villas in Bali and Tulum.
              Each property offers a unique blend of local culture and modern amenities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {properties.map((property) => (
              <PropertyBookingCard 
                key={property.id}
                id={property.id}
                title={property.title}
                location={property.location}
                description={property.description}
                image={property.images[0]}
                price={property.price}
                rating={property.rating}
              />
            ))}
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
                <h2 className="heading-md mb-4">Exceptional Service, Unforgettable Stays</h2>
                <p className="paragraph mb-6">
                  When you book with Serene Stays, you're not just getting a beautiful property – you're gaining access to our full suite of concierge services designed to make your vacation truly special.
                </p>
                <p className="paragraph mb-6">
                  From airport transfers and daily cleaning to private chefs and guided excursions, we take care of every detail so you can focus on creating memories.
                </p>
                <Button asChild>
                  <Link to="/booking">Book Your Stay</Link>
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
