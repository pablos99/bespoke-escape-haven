
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
        'fixed inset-0 z-40 flex flex-col items-start justify-start pt-20 px-6 overflow-y-auto md:hidden transform transition-transform duration-300 ease-in-out h-full',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
      style={{ backgroundColor: 'var(--background)', boxShadow: isOpen ? '0 0 15px rgba(0,0,0,0.1)' : 'none' }}
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
        <div className="pt-6 border-t border-border">
          <Button asChild className="w-full">
            <Link to="/booking">{t('button.bookNow')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
