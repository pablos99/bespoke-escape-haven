
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { PropertyBookingForm } from '@/components/booking/PropertyBookingForm';
import { GuestInformationForm } from '@/components/booking/GuestInformationForm';
import { BookingInformation } from '@/components/booking/BookingInformation';
import { BookingHeader } from '@/components/booking/BookingHeader';

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
    id: "beachfront-villa",
    title: "Beachfront Villa",
    price: 350,
    image: "https://images.unsplash.com/photo-1570737209810-87a8e7245f88?q=80&w=2532&auto=format&fit=crop",
    category: "property" as const
  },
  {
    id: "jungle-retreat",
    title: "Jungle Retreat",
    price: 295,
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2670&auto=format&fit=crop",
    category: "property" as const
  }
];

export default function Booking() {
  const { id } = useParams<{ id?: string }>();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedProperty, setSelectedProperty] = useState<string>(id || "");
  const propertySelectRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (id) {
      setSelectedProperty(id);
      
      // Add a small delay to ensure the component is fully rendered
      setTimeout(() => {
        // Scroll to the property selection area
        if (propertySelectRef.current) {
          propertySelectRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 100);
    }
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <section className="container max-w-6xl mx-auto px-4 mb-16">
          <BookingHeader />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <PropertyBookingForm
              date={date}
              setDate={setDate}
              endDate={endDate}
              setEndDate={setEndDate}
              selectedProperty={selectedProperty}
              setSelectedProperty={setSelectedProperty}
              properties={properties}
              propertySelectRef={propertySelectRef}
            />
            
            <GuestInformationForm />
          </div>
        </section>
        
        <BookingInformation />
      </main>
      
      <Footer />
    </div>
  );
}
