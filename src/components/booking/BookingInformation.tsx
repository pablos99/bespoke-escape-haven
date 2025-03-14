
import React from 'react';

export function BookingInformation() {
  return (
    <section className="bg-muted py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="heading-md mb-4">Booking Information</h2>
          <p className="paragraph max-w-3xl mx-auto">
            Everything you need to know about booking your stay with us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-background p-6 rounded-xl">
            <h3 className="text-xl font-medium mb-3">Reservation Policy</h3>
            <p className="text-muted-foreground">We require a 50% deposit to secure your booking, with the balance due 30 days before arrival.</p>
          </div>
          
          <div className="bg-background p-6 rounded-xl">
            <h3 className="text-xl font-medium mb-3">Cancellation Terms</h3>
            <p className="text-muted-foreground">Free cancellation up to 45 days before arrival. 50% refund for cancellations 44-30 days before arrival.</p>
          </div>
          
          <div className="bg-background p-6 rounded-xl">
            <h3 className="text-xl font-medium mb-3">Check-in/Check-out</h3>
            <p className="text-muted-foreground">Check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in or late check-out may be arranged upon request.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
