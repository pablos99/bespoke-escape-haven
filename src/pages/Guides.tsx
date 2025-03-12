
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ServiceCard, ServiceCardProps } from '@/components/ui/ServiceCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const guides: ServiceCardProps[] = [
  {
    id: "1",
    title: "Maya - Cultural Historian",
    description: "Discover the hidden stories of Tulum with Maya, a local historian with deep knowledge of Mayan culture and traditions. Perfect for those seeking authentic cultural experiences.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 95,
    category: "guides" as const,
  },
  {
    id: "2",
    title: "Ketut - Spiritual Guide",
    description: "Experience Bali's spiritual side with Ketut, a third-generation healer and meditation expert. Learn traditional Balinese healing practices and mindfulness techniques.",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 120,
    category: "guides" as const,
  },
  {
    id: "3",
    title: "Carlos - Jungle Explorer",
    description: "Venture into the Yucatan jungle with Carlos, a wildlife expert who has spent decades studying the region's unique ecosystems. Discover hidden cenotes and rare wildlife.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 110,
    category: "guides" as const,
  },
  {
    id: "4",
    title: "Nia - Surf Instructor",
    description: "Catch the perfect wave with Nia, a professional surfer born and raised in Bali. From beginners to advanced surfers, her personalized lessons will elevate your surfing experience.",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 85,
    category: "guides" as const,
  },
];

export default function Guides() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <section className="container max-w-6xl mx-auto px-4 mb-16">
          <div className="text-center mb-10">
            <h1 className="heading-lg mb-4">Meet Your Guides</h1>
            <p className="paragraph-lg max-w-3xl mx-auto text-muted-foreground">
              Connect with our exceptional local guides who will transform your stay into an unforgettable journey.
              Each guide brings unique expertise and authentic local perspective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <ServiceCard key={guide.id} {...guide} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </section>
        
        <section className="bg-accent/20 py-16">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="heading-md mb-4">Why Choose Our Local Guides?</h2>
              <p className="paragraph max-w-3xl mx-auto">
                Our guides are carefully selected for their deep knowledge, passion, and authentic connection to the local culture and environment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-xl">
                <h3 className="text-xl font-medium mb-3">Local Expertise</h3>
                <p className="text-muted-foreground">All our guides are locals with generations of knowledge about the area, its history, and its secrets.</p>
              </div>
              
              <div className="bg-background p-6 rounded-xl">
                <h3 className="text-xl font-medium mb-3">Personalized Experience</h3>
                <p className="text-muted-foreground">Every tour is tailored to your interests and preferences for a truly unique experience.</p>
              </div>
              
              <div className="bg-background p-6 rounded-xl">
                <h3 className="text-xl font-medium mb-3">Cultural Immersion</h3>
                <p className="text-muted-foreground">Go beyond tourist attractions and truly immerse yourself in local traditions and daily life.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
