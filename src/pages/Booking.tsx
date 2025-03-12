import React, { useState } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function Booking() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-8 pb-16">
        <section className="container max-w-6xl mx-auto px-4 mb-16">
          <div className="text-center mb-10">
            <h1 className="heading-lg mb-4">Book Your Stay</h1>
            <p className="paragraph-lg max-w-3xl mx-auto text-muted-foreground">
              Secure your perfect getaway in Bali or Tulum with our simple booking process.
              Our team is ready to help you create an unforgettable experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-background border border-border rounded-xl p-8">
              <h2 className="heading-md mb-6">Reservation Details</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="property">Choose Property</Label>
                  <Select>
                    <SelectTrigger id="property" className="w-full">
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bali">Tranquil Bali Villa</SelectItem>
                      <SelectItem value="tulum">Tulum Beach Retreat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Label>Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="flex-1">
                    <Label>Check-out Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="adults">Adults</Label>
                    <Select>
                      <SelectTrigger id="adults">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1">
                    <Label htmlFor="children">Children</Label>
                    <Select>
                      <SelectTrigger id="children">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="special-requests">Special Requests</Label>
                  <Textarea 
                    id="special-requests" 
                    placeholder="Let us know if you have any special requirements or requests"
                    className="resize-none" 
                    rows={4}
                  />
                </div>
              </div>
            </div>
            
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
          </div>
        </section>
        
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
      </main>
      
      <Footer />
    </div>
  );
}
