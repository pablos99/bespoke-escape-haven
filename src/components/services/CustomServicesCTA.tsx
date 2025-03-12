
import React from 'react';
import { Button } from '@/components/ui/button';
import { AnimatedImage } from '@/components/ui/AnimatedImage';

export const CustomServicesCTA: React.FC = () => {
  return (
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
  );
};
