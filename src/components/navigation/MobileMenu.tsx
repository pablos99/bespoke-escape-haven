
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
  
  // Quick links directly from footer
  const quickLinks = [
    { name: 'nav.home', href: '/' },
    { name: 'nav.properties', href: '/properties' },
    { name: 'nav.cities', href: '/cities' },
    { name: 'nav.services', href: '/services' },
    { name: 'nav.booking', href: '/booking' },
    { name: 'nav.about', href: '/about' },
    { name: 'nav.artisanProducts', href: '/artisan-products' },
  ];
  
  return (
    <div
      className={cn(
        'fixed inset-0 z-40 flex flex-col items-start justify-start pt-20 px-6 overflow-y-auto md:hidden bg-background transform transition-transform duration-300 ease-in-out h-full',
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
        
        {/* Quick Links Section */}
        <div className="pt-6 border-t border-border">
          <h3 className="text-lg font-medium text-primary mb-4">{t('footer.quickLinks')}</h3>
          <div className="flex flex-col space-y-3">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  'text-base transition-all duration-200 hover:text-primary',
                  location.pathname === link.href
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground'
                )}
              >
                {t(link.name)}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="pt-6 border-t border-border">
          <Button asChild className="w-full">
            <Link to="/booking">{t('button.bookNow')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
