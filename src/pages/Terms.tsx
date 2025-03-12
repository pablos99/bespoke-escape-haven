import React from 'react';
import { Footer } from '@/components/layout/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-8 pb-16">
        <section className="container max-w-6xl mx-auto px-4 mb-16">
          <div className="text-center mb-10">
            <h1 className="heading-lg mb-4">Terms of Service</h1>
            <p className="paragraph-lg max-w-3xl mx-auto text-muted-foreground">
              The rules and guidelines for using Serene Stays services.
            </p>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using our website and services, you agree to be bound by these Terms of Service.
            </p>
            
            <h2>Booking and Cancellation</h2>
            <p>
              All bookings are subject to availability and confirmation. Our cancellation policy requires:
            </p>
            <ul>
              <li>Full refund for cancellations 45+ days before arrival</li>
              <li>50% refund for cancellations 30-44 days before arrival</li>
              <li>No refund for cancellations less than 30 days before arrival</li>
            </ul>
            
            <h2>Payment Terms</h2>
            <p>
              A 50% deposit is required to secure your booking. The remaining balance is due 30 days before arrival.
            </p>
            
            <h2>Property Usage</h2>
            <p>
              Our properties are to be used only by the registered guests. Events or gatherings exceeding the maximum occupancy require prior approval.
            </p>
            
            <h2>Liability</h2>
            <p>
              While we take utmost care to ensure safety, Serene Stays is not liable for any injury, loss, or damage to personal belongings during your stay.
            </p>
            
            <h2>House Rules</h2>
            <p>
              All guests must adhere to specific house rules provided at the time of booking and displayed at the property.
            </p>
            
            <h2>Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Continued use of our services following such changes constitutes acceptance of the new terms.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions regarding these Terms of Service, please contact us at terms@serenestays.com.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
