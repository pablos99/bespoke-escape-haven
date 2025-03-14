
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookingForm, BookingItem } from '@/components/booking/BookingForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

// Mock data - in a real app would come from API
const properties = [
  {
    id: "bali-villa",
    title: "Tranquil Bali Villa",
    price: 250,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "property" as const
  },
  {
    id: "tulum-beach",
    title: "Tulum Beach Retreat",
    price: 320,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "property" as const
  },
  {
    id: "bali-villa",
    title: "Beachfront Villa",
    price: 350,
    image: "https://images.unsplash.com/photo-1570737209810-87a8e7245f88?q=80&w=2532&auto=format&fit=crop",
    category: "property" as const
  },
  {
    id: "tulum-retreat",
    title: "Jungle Retreat",
    price: 295,
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2670&auto=format&fit=crop",
    category: "property" as const
  }
];

export default function PropertyBooking() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const property = properties.find(p => p.id === propertyId);
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="heading-lg mb-4">{t('booking.propertyNotFound')}</h1>
            <p className="paragraph-lg mb-8">{t('booking.propertyNotFoundDesc')}</p>
            <Button onClick={() => navigate('/properties')}>
              {t('booking.backToProperties')}
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <section className="container max-w-6xl mx-auto px-4 mb-16">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/properties')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('booking.backToProperties')}
          </Button>
          
          <div className="text-center mb-10">
            <h1 className="heading-lg mb-4">{t('booking.bookProperty')}</h1>
            <p className="paragraph-lg max-w-3xl mx-auto text-muted-foreground">
              {t('booking.bookPropertyDesc')}
            </p>
          </div>
          
          <BookingForm item={property} />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
