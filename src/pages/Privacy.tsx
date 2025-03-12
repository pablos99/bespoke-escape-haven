import React from 'react';
import { Footer } from '@/components/layout/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-8 pb-16">
        <section className="container max-w-6xl mx-auto px-4 mb-16">
          <div className="text-center mb-10">
            <h1 className="heading-lg mb-4">Privacy Policy</h1>
            <p className="paragraph-lg max-w-3xl mx-auto text-muted-foreground">
              How we protect and manage your data at Serene Stays.
            </p>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
            <h2>Introduction</h2>
            <p>
              This Privacy Policy explains how Serene Stays collects, uses, and protects your personal information when you use our website and services.
            </p>
            
            <h2>Information We Collect</h2>
            <p>
              When you use our services, we may collect personal information including:
            </p>
            <ul>
              <li>Contact information (name, email, phone number)</li>
              <li>Booking preferences and history</li>
              <li>Payment information</li>
              <li>Travel documentation when necessary</li>
              <li>Communications with our team</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>
              We use your information to:
            </p>
            <ul>
              <li>Process bookings and payments</li>
              <li>Provide customer service</li>
              <li>Customize your experience</li>
              <li>Communicate about your booking or stay</li>
              <li>Improve our services</li>
            </ul>
            
            <h2>Data Protection</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2>Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Restrict processing of your data</li>
              <li>Data portability</li>
            </ul>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@serenestays.com.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
