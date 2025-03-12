import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from '@/contexts/AppContext';
import { Logo } from '@/components/ui/Logo';

const navigation = [
  { name: 'nav.home', href: '/' },
  { name: 'nav.properties', href: '/properties' },
  { 
    name: 'nav.cities', 
    href: '/cities',
    submenu: [
      { name: 'nav.bali', href: '/cities/bali' },
      { name: 'nav.tulum', href: '/cities/tulum' },
    ]
  },
  { name: 'nav.services', href: '/services' },
  { name: 'nav.booking', href: '/booking' },
  { name: 'nav.about', href: '/about' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, language, setLanguage, theme, setTheme } = useApp();
  
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
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
        <nav className="hidden md:flex space-x-10">
          {navigation.map((item) => {
            if (item.submenu) {
              return (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className={cn(
                    'text-sm transition-all duration-200 hover:text-primary',
                    location.pathname === item.href || location.pathname.startsWith(item.href + '/')
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground'
                  )}>
                    {t(item.name)}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.submenu.map((subitem) => (
                      <DropdownMenuItem key={subitem.name} asChild>
                        <Link 
                          to={subitem.href}
                          className={cn(
                            'w-full',
                            location.pathname === subitem.href
                              ? 'font-medium'
                              : ''
                          )}
                        >
                          {t(subitem.name)}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            
            return (
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
            );
          })}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'font-medium' : ''}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('es')} className={language === 'es' ? 'font-medium' : ''}>
                Español
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <Button asChild>
            <Link to="/booking">{t('button.bookNow')}</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'font-medium' : ''}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('es')} className={language === 'es' ? 'font-medium' : ''}>
                Español
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <button
            className="relative z-50 text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Now with solid background */}
      <div
        className={cn(
          'fixed inset-0 bg-background z-40 flex flex-col items-center justify-center space-y-8 md:hidden transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
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
    </header>
  );
}
