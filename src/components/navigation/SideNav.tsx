import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';
import { ThemeToggle } from '@/components/navigation/ThemeToggle';
import { LanguageSwitcher } from '@/components/navigation/LanguageSwitcher';
import { Logo } from '@/components/ui/Logo';
import { navigation } from './navigation-data';
import { Menu, X } from 'lucide-react';

export function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useApp();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Close menu when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  return (
    <>
      {/* Mobile Menu Trigger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 md:hidden bg-primary text-primary-foreground rounded-full p-2 shadow-lg"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Mobile Navigation Slide-in Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-64 bg-background shadow-lg transform transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <Logo />
            </Link>
            <button onClick={toggleMenu} aria-label="Close menu">
              <X size={24} className="text-primary" />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6 flex-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-lg transition-all duration-200 hover:text-primary',
                  location.pathname === item.href
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground'
                )}
              >
                {t(item.name)}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
