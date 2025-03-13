
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/navigation/ThemeToggle';
import { LanguageSwitcher } from '@/components/navigation/LanguageSwitcher';
import { navigation } from './navigation-data';
import { Button } from '@/components/ui/button';
import { LogIn, User } from 'lucide-react';

export function TopNav() {
  const location = useLocation();
  const { t } = useApp();
  const { user, isAdmin } = useAuth();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 bg-background/95 backdrop-blur-md shadow-sm hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <div className="hidden sm:block">
            <Logo />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="flex space-x-8">
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
                {t(item.name)}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Center Logo for large screens */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:block">
          <Logo className="scale-110" />
        </div>
        
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeToggle />
          
          {user ? (
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/dashboard">Admin</Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" asChild>
                <Link to="/account">
                  <User className="mr-2 h-4 w-4" />
                  My Account
                </Link>
              </Button>
            </div>
          ) : (
            <Button size="sm" asChild>
              <Link to="/auth/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
