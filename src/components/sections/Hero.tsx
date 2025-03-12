
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

export function Hero({
  title,
  subtitle,
  backgroundImage,
  buttonText = 'Explore Properties',
  buttonLink = '/properties',
  className
}: HeroProps) {
  return (
    <section 
      className={cn(
        'relative h-[90vh] flex items-center justify-center overflow-hidden',
        className
      )}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 text-center">
        <h1 className="heading-xl text-white mb-6 animate-fade-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
          {subtitle}
        </p>
        {buttonText && (
          <Button asChild className="animate-fade-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]" size="lg">
            <Link to={buttonLink}>{buttonText}</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
