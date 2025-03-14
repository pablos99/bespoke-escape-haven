
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function GuestInformationForm() {
  return (
    <div className="bg-background border border-border rounded-xl p-8">
      <h2 className="heading-md mb-6">Guest Information</h2>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="first-name">First Name</Label>
            <Input id="first-name" placeholder="Your first name" />
          </div>
          
          <div className="flex-1">
            <Label htmlFor="last-name">Last Name</Label>
            <Input id="last-name" placeholder="Your last name" />
          </div>
        </div>
        
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="your.email@example.com" />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="+1 (555) 000-0000" />
        </div>
        
        <div className="pt-4">
          <Button className="w-full">Request Booking</Button>
          <p className="text-sm text-muted-foreground mt-4">
            Our team will contact you within 24 hours to confirm availability and finalize your booking.
          </p>
        </div>
      </div>
    </div>
  );
}
