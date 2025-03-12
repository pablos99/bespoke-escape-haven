
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookingForm, BookingItem } from '@/components/booking/BookingForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

// Mock data - in a real app would come from API
const guides = [
  {
    id: "1",
    title: "Maya - Cultural Historian",
    price: 95,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "guide" as const
  },
  {
    id: "2",
    title: "Ketut - Spiritual Guide",
    price: 120,
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "guide" as const
  },
  // Add more guides if needed
];

export default function GuideBooking() {
  const { guideId } = useParams<{ guideId: string }>();
  const navigate = useNavigate();
  const { t } = useApp();
  
  const guide = guides.find(g => g.id === guideId);
  
  if (!guide) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="heading-lg mb-4">{t('booking.guideNotFound')}</h1>
            <p className="paragraph-lg mb-8">{t('booking.guideNotFoundDesc')}</p>
            <Button onClick={() => navigate('/services/guides')}>
              {t('booking.backToGuides')}
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
            onClick={() => navigate('/services/guides')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('booking.backToGuides')}
          </Button>
          
          <div className="text-center mb-10">
            <h1 className="heading-lg mb-4">{t('booking.bookGuide')}</h1>
            <p className="paragraph-lg max-w-3xl mx-auto text-muted-foreground">
              {t('booking.bookGuideDesc')}
            </p>
          </div>
          
          <BookingForm item={guide} />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
