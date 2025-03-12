
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ServiceBookingCard } from '@/components/ui/ServiceBookingCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const products = [
  {
    id: "1",
    title: "Handwoven Bali Basket",
    description: "Traditional handwoven basket made by local Balinese artisans using sustainable materials. Perfect for storing fruits or as a decorative piece.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 65,
    category: "product" as const,
  },
  {
    id: "2",
    title: "Tulum Ceramic Vase",
    description: "Hand-painted ceramic vase created by Tulum artisans using traditional Mayan patterns and techniques. Each piece is unique and tells a story.",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 89,
    category: "product" as const,
  },
  {
    id: "3",
    title: "Coconut Shell Candles",
    description: "Organic coconut wax candles in repurposed coconut shells. Made with essential oils by a women's cooperative in Bali.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 42,
    category: "product" as const,
  },
  {
    id: "4",
    title: "Mayan Dreamcatcher",
    description: "Authentic dreamcatcher handcrafted by Mayan artisans in Tulum using locally sourced materials and traditional weaving techniques.",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 55,
    category: "product" as const,
  },
];

export default function ArtisanProducts() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <section className="container max-w-6xl mx-auto px-4 mb-16" id="products-list">
          <div className="text-center mb-10">
            <h1 className="heading-lg mb-4">Artisan Products</h1>
            <p className="paragraph-lg max-w-3xl mx-auto text-muted-foreground">
              Discover authentic, handcrafted treasures made by skilled local artisans from Bali and Tulum.
              Each product tells a unique story and supports the local community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ServiceBookingCard key={product.id} {...product} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </section>
        
        <section className="bg-secondary py-16" id="artisan-impact">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-md mb-4">Each Purchase Makes a Difference</h2>
                <p className="paragraph mb-6">
                  When you purchase our artisan products, you're not just buying a beautiful handcrafted item – you're supporting local families, preserving traditional craftsmanship, and promoting sustainable practices.
                </p>
                <p className="paragraph mb-6">
                  Many of our products are made by community cooperatives and family workshops, ensuring fair wages and ethical production methods.
                </p>
                <Button asChild variant="outline">
                  <Link to="/about">Learn About Our Impact</Link>
                </Button>
              </div>
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Artisan workshop" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
