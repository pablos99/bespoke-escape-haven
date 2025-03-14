
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';
import { Logo } from '@/components/ui/Logo';
import { DesktopMenu } from '@/components/navigation/DesktopMenu';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { LanguageSwitcher } from '@/components/navigation/LanguageSwitcher';
import { ThemeToggle } from '@/components/navigation/ThemeToggle';
import { MobileMenuButton } from '@/components/navigation/MobileMenuButton';
import { navigation } from '@/components/navigation/navigation-data';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileMenu } from '@/components/navigation/ProfileMenu';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
          <LanguageSwitcher />
          <ThemeToggle />
          
          {!user ? (
            <Button asChild>
              <Link to="/login">{t('auth.login')}</Link>
            </Button>
          ) : (
            <ProfileMenu />
          )}
          
          <Button asChild>
            <Link to="/booking">{t('button.bookNow')}</Link>
          </Button>
        </div>

        {/* Mobile menu button - always visible */}
        <div className="flex md:flex items-center space-x-2">
          <MobileMenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={isOpen} navigation={navigation} />
    </header>
  );
}
