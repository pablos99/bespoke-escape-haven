
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';
import { NavigationItem } from './types';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

interface MobileMenuProps {
  isOpen: boolean;
  navigation: NavigationItem[];
}

export function MobileMenu({ isOpen, navigation }: MobileMenuProps) {
  const location = useLocation();
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
  return (
    <div
      className={cn(
        'fixed inset-0 z-40 flex flex-col items-start justify-start pt-20 px-6 overflow-y-auto bg-background transform transition-transform duration-300 ease-in-out h-full',
        isOpen ? 'translate-y-0' : '-translate-y-full'
      )}
      style={{ boxShadow: isOpen ? '0 4px 15px rgba(0,0,0,0.1)' : 'none' }}
    >
      <div className="w-full space-y-6 mt-4">
        {navigation.map((item) => {
          if (item.submenu) {
            return (
              <div key={item.name} className="flex flex-col space-y-4">
                <span className="text-lg font-medium text-primary">{t(item.name)}</span>
                <div className="flex flex-col space-y-4 pl-4">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.name}
                      to={subitem.href}
                      className={cn(
                        'text-base transition-all duration-200 hover:text-primary',
                        location.pathname === subitem.href
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground'
                      )}
                    >
                      {t(subitem.name)}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'text-lg transition-all duration-200 hover:text-primary block',
                location.pathname === item.href
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              )}
            >
              {t(item.name)}
            </Link>
          );
        })}
        
        {/* Theme and Language Toggles */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
        
        <div className="pt-6 border-t border-border space-y-4">
          <Button asChild className="w-full">
            <Link to="/booking">{t('button.bookNow')}</Link>
          </Button>
          
          {!user ? (
            <div className="flex flex-col space-y-2 mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/login">{t('auth.login')}</Link>
              </Button>
              <Button asChild variant="secondary" className="w-full">
                <Link to="/signup">{t('auth.signup')}</Link>
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
              onClick={handleSignOut}
            >
              {t('auth.logout')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
