
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/contexts/TranslationContext';

export type BookingItem = {
  id: string;
  title: string;
  price: number;
  image?: string;
  category: 'property' | 'product' | 'guide' | 'activity';
};

type BookingFormProps = {
  item: BookingItem;
};

export function BookingForm({ item }: BookingFormProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState<string>('1');
  const [children, setChildren] = useState<string>('0');
  const [specialRequests, setSpecialRequests] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: t('booking.successTitle'),
        description: t('booking.successDescription'),
      });
    }, 1500);
  };

  const isProperty = item.category === 'property';
  const isService = item.category === 'guide' || item.category === 'activity';
  const isProduct = item.category === 'product';

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-background border border-border rounded-xl p-8">
        <h2 className="heading-md mb-6">{t('booking.reservationDetails')}</h2>
        
        <div className="space-y-6">
          <div>
            <Label>{t('booking.selectedItem')}</Label>
            <div className="flex items-center gap-3 mt-2 p-3 bg-secondary rounded-md">
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="h-16 w-16 object-cover rounded-md"
                />
              )}
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-muted-foreground">
                  ${item.price} {isProperty ? t('booking.perNight') : isService ? t('booking.perSession') : ''}
                </div>
              </div>
            </div>
          </div>
          
          {(isProperty || isService) && (
            <div className={cn(isService ? "flex-1" : "flex flex-col md:flex-row gap-4")}>
              <div className="flex-1">
                <Label>{isProperty ? t('booking.checkIn') : t('booking.date')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-2",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>{t('booking.selectDate')}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {isProperty && (
                <div className="flex-1 mt-4 md:mt-0">
                  <Label>{t('booking.checkOut')}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-2",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>{t('booking.selectDate')}</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          )}
          
          {isProduct && (
            <div>
              <Label htmlFor="quantity">{t('booking.quantity')}</Label>
              <Select value="1" onValueChange={() => {}}>
                <SelectTrigger id="quantity" className="mt-2">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {(isProperty || isService) && (
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="adults">{t('booking.adults')}</Label>
                <Select value={adults} onValueChange={setAdults}>
                  <SelectTrigger id="adults" className="mt-2">
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
                <Label htmlFor="children">{t('booking.children')}</Label>
                <Select value={children} onValueChange={setChildren}>
                  <SelectTrigger id="children" className="mt-2">
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
          )}
          
          <div>
            <Label htmlFor="special-requests">{t('booking.specialRequests')}</Label>
            <Textarea 
              id="special-requests" 
              placeholder={t('booking.specialRequestsPlaceholder')}
              className="resize-none mt-2" 
              rows={4}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-background border border-border rounded-xl p-8">
        <h2 className="heading-md mb-6">{t('booking.guestInformation')}</h2>
        
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="first-name">{t('booking.firstName')}</Label>
              <Input 
                id="first-name" 
                placeholder={t('booking.firstNamePlaceholder')} 
                className="mt-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            
            <div className="flex-1">
              <Label htmlFor="last-name">{t('booking.lastName')}</Label>
              <Input 
                id="last-name" 
                placeholder={t('booking.lastNamePlaceholder')} 
                className="mt-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">{t('booking.email')}</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder={t('booking.emailPlaceholder')} 
              className="mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">{t('booking.phone')}</Label>
            <Input 
              id="phone" 
              placeholder={t('booking.phonePlaceholder')} 
              className="mt-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          
          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('booking.processing')}
                </>
              ) : (
                isProduct ? t('booking.purchase') : t('booking.requestBooking')
              )}
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              {isProduct 
                ? t('booking.productDisclaimer') 
                : t('booking.bookingDisclaimer')}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
