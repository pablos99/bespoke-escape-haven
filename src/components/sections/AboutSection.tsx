
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedImage } from '@/components/ui/AnimatedImage';

export function AboutSection() {
  return (
    <section className="py-20 px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 animate-fade-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
            <div className="inline-block mb-4">
              <span className="bg-ocean-light text-ocean-dark font-medium px-2.5 py-1 rounded">Our Story</span>
            </div>
            <h2 className="heading-md mb-6 text-foreground">Crafting Unforgettable Experiences in Paradise</h2>
            <p className="paragraph text-foreground/80 mb-6">
              We curate exceptional stays in Bali and Tulum, connecting you with the authentic soul of each destination.
              Our properties are more than just places to stay; they're gateways to experiences that
              celebrate local culture, craftsmanship, and natural beauty.
            </p>
            <p className="paragraph text-foreground/80 mb-8">
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
  );
}
