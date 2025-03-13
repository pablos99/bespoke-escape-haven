
import React from 'react';
import { ReviewCard } from '@/components/ui/ReviewCard';

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

export function ReviewsSection() {
  return (
    <section className="py-20 px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-lg mb-4 text-foreground">Guest Experiences</h2>
          <p className="paragraph text-foreground/80">
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
  );
}
