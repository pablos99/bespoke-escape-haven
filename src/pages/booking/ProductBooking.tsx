
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookingForm, BookingItem } from '@/components/booking/BookingForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

// Mock data - in a real app would come from API
const products = [
  {
    id: "balinese-craft",
    title: "Handcrafted Balinese Textiles",
    price: 120,
    image: "https://images.unsplash.com/photo-1621812956658-78796291dc2e?q=80&w=2670&auto=format&fit=crop",
    category: "product" as const
  },
  {
    id: "tulum-pottery",
    title: "Artisanal Mexican Pottery",
    price: 95,
    image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2669&auto=format&fit=crop",
    category: "product" as const
  },
  // Add more products if needed
];

export default function ProductBooking() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { t } = useApp();
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="heading-lg mb-4">{t('booking.productNotFound')}</h1>
            <p className="paragraph-lg mb-8">{t('booking.productNotFoundDesc')}</p>
            <Button onClick={() => navigate('/services/products')}>
              {t('booking.backToProducts')}
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
            onClick={() => navigate('/services/products')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('booking.backToProducts')}
          </Button>
          
          <div className="text-center mb-10">
            <h1 className="heading-lg mb-4">{t('booking.purchaseProduct')}</h1>
            <p className="paragraph-lg max-w-3xl mx-auto text-muted-foreground">
              {t('booking.purchaseProductDesc')}
            </p>
          </div>
          
          <BookingForm item={product} />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
