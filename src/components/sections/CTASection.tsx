
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedImage } from '@/components/ui/AnimatedImage';
import { BookingCTA } from '@/components/ui/BookingCTA';

export function CTASection() {
  return (
    <section className="py-20 px-6 md:px-8 lg:px-12 bg-terra-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-background rounded-xl p-8 md:p-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="heading-md mb-6 text-foreground">Ready to Experience Paradise?</h2>
              <p className="paragraph text-foreground/80 mb-8">
                Book your stay at one of our exclusive properties and discover
                the perfect blend of luxury, culture, and natural beauty.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <BookingCTA propertyId="bali-villa" size="lg" />
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
  );
}
