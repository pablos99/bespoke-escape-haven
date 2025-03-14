
import React from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

interface Review {
  id: string;
  author: string;
  location: string;
  date: string;
  rating: number;
  content: string;
  image: string;
}

interface PropertyReviewsProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export function PropertyReviews({ reviews, rating, reviewCount }: PropertyReviewsProps) {
  const { t } = useApp();
  
  return (
    <section className="container mx-auto px-4 py-12 border-t border-border">
      <h2 className="heading-md mb-8 flex items-center">
        <span className="text-yellow-500 mr-2">★</span>
        {rating} · {reviewCount} {t('property.reviews')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="bg-background border border-border rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img src={review.image} alt={review.author} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-medium">{review.author}</h3>
                <p className="text-sm text-muted-foreground">{review.location}</p>
              </div>
            </div>
            <div className="flex items-center mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">{review.date}</span>
            </div>
            <p className="text-muted-foreground">{review.content}</p>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button variant="outline">{t('buttons.viewAllReviews')}</Button>
      </div>
    </section>
  );
}
