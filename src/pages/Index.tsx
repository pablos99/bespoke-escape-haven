
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { PropertiesSection } from '@/components/sections/PropertiesSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { CTASection } from '@/components/sections/CTASection';

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
        
        <PropertiesSection />
        <AboutSection />
        <ServicesSection />
        <ReviewsSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
