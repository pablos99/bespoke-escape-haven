
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/contexts/TranslationContext';
import { ThemeToggle } from '@/components/navigation/ThemeToggle';
import { LanguageSwitcher } from '@/components/navigation/LanguageSwitcher';
import { Logo } from '@/components/ui/Logo';
import { navigation } from './navigation-data';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Handle scroll events to show/hide the navigation button
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show the button when scrolling all the way to the top
      // or when scrolling up more than 50px
      if (currentScrollY === 0) {
        setIsVisible(true);
      } else {
        setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  // Close menu when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  return (
    <>
      {/* Mobile Menu Trigger Button - Now visible on all breakpoints */}
      <button
        onClick={toggleMenu}
        className={cn(
          "fixed top-4 right-4 z-50 bg-primary text-primary-foreground rounded-full p-2 shadow-lg transition-all duration-300",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-[-100px] opacity-0"
        )}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Mobile Navigation Slide-in Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-64 bg-background shadow-lg transform transition-transform duration-300 ease-in-out",
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
          
          {!user && (
            <div className="flex flex-col space-y-2 mt-auto mb-4 border-t border-border pt-4">
              <Button asChild variant="outline" size="sm">
                <Link to="/auth/login">{t('auth.login')}</Link>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <Link to="/auth/signup">{t('auth.signup')}</Link>
              </Button>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
