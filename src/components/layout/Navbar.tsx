
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Properties', href: '/properties' },
  { name: 'Services', href: '/services' },
  { name: 'Booking', href: '/booking' },
  { name: 'About', href: '/about' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-8 lg:px-12 py-4 bg-background shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="relative z-50">
          <span className="text-2xl font-light tracking-tight text-primary">Serene Stays</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'text-sm transition-all duration-200 hover:text-primary',
                location.pathname === item.href
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild>
            <Link to="/booking">Book Now</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden relative z-50 text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 bg-background z-40 flex flex-col items-center justify-center space-y-8 md:hidden transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              'text-xl transition-all duration-200 hover:text-primary',
              location.pathname === item.href
                ? 'text-primary font-medium'
                : 'text-muted-foreground'
            )}
          >
            {item.name}
          </Link>
        ))}
        <div className="pt-4">
          <Button asChild>
            <Link to="/booking">Book Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
