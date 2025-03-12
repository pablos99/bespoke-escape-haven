
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { NavigationItem } from './types';

interface MobileMenuProps {
  isOpen: boolean;
  navigation: NavigationItem[];
}

export function MobileMenu({ isOpen, navigation }: MobileMenuProps) {
  const location = useLocation();
  const { t } = useApp();
  
  return (
    <div
      className={cn(
        'fixed inset-0 bg-background z-40 flex flex-col items-center justify-center space-y-8 md:hidden transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
      style={{ backgroundColor: 'var(--background)' }} /* Ensure solid background */
    >
      {navigation.map((item) => {
        if (item.submenu) {
          return (
            <div key={item.name} className="flex flex-col items-center space-y-4">
              <span className="text-xl font-medium text-primary">{t(item.name)}</span>
              <div className="flex flex-col items-center space-y-4">
                {item.submenu.map((subitem) => (
                  <Link
                    key={subitem.name}
                    to={subitem.href}
                    className={cn(
                      'text-lg transition-all duration-200 hover:text-primary',
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
              'text-xl transition-all duration-200 hover:text-primary',
              location.pathname === item.href
                ? 'text-primary font-medium'
                : 'text-muted-foreground'
            )}
          >
            {t(item.name)}
          </Link>
        );
      })}
      <div className="pt-4">
        <Button asChild>
          <Link to="/booking">{t('button.bookNow')}</Link>
        </Button>
      </div>
    </div>
  );
}
