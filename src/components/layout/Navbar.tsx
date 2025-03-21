
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';
import { Logo } from '@/components/ui/Logo';
import { DesktopMenu } from '@/components/navigation/DesktopMenu';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { navigation } from '@/components/navigation/navigation-data';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileMenu } from '@/components/navigation/ProfileMenu';
import { SettingsMenu } from '@/components/navigation/SettingsMenu';
import { MobileMenuButton } from '@/components/navigation/MobileMenuButton';
import { useIsMobile } from '@/hooks/use-mobile';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-8 lg:px-12 py-4 bg-background/95 backdrop-blur-md shadow-sm"
      id="navbar"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="relative z-50">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <DesktopMenu navigation={navigation} />

        <div className="hidden md:flex items-center space-x-4">
          <SettingsMenu />
          
          {!user ? (
            <Button asChild>
              <Link to="/login">{t('auth.login')}</Link>
            </Button>
          ) : (
            <ProfileMenu />
          )}
        </div>

        {/* Mobile menu button - only visible on mobile */}
        <div className="flex md:hidden items-center">
          <MobileMenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} navigation={navigation} />
    </header>
  );
}
