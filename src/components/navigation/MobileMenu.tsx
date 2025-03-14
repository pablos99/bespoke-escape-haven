
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/contexts/TranslationContext';
import { NavigationItem } from './types';
import { useAuth } from '@/contexts/AuthContext';
import { X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useApp } from '@/contexts/AppContext';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navigation: NavigationItem[];
}

export function MobileMenu({ isOpen, setIsOpen, navigation }: MobileMenuProps) {
  const location = useLocation();
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const { theme, setTheme, language, setLanguage } = useApp();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md md:hidden overflow-y-auto"
    >
      <div className="container mx-auto px-4 py-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <Logo />
          </Link>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-primary"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1">
          <div className="space-y-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'block text-lg transition-colors duration-200 hover:text-primary',
                  location.pathname === item.href
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground'
                )}
                onClick={() => setIsOpen(false)}
              >
                {t(item.name)}
              </Link>
            ))}
            
            {/* Settings section */}
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-medium text-primary mb-4">{t('settings.title') || 'Settings'}</h3>
              
              <div className="space-y-4 pl-2">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('settings.theme') || 'Theme'}</span>
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {theme === 'light' ? t('settings.darkMode') || 'Dark Mode' : t('settings.lightMode') || 'Light Mode'}
                    </Button>
                  </div>
                </div>
                
                {/* Language selection */}
                <div className="space-y-2">
                  <span className="text-muted-foreground">{t('settings.language') || 'Language'}</span>
                  <div className="grid grid-cols-2 gap-2 pl-2">
                    <button
                      onClick={() => setLanguage('en')}
                      className={cn(
                        "text-left py-1 px-2 rounded",
                        language === 'en' 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'text-muted-foreground hover:bg-primary/5'
                      )}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setLanguage('es')}
                      className={cn(
                        "text-left py-1 px-2 rounded",
                        language === 'es' 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'text-muted-foreground hover:bg-primary/5'
                      )}
                    >
                      Español
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Authentication section */}
        <div className="mt-6 pt-6 border-t border-border">
          {!user ? (
            <div className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-center">
                <Link to="/login" onClick={() => setIsOpen(false)}>{t('auth.login')}</Link>
              </Button>
              <Button asChild className="w-full justify-center">
                <Link to="/auth/signup" onClick={() => setIsOpen(false)}>{t('auth.signup')}</Link>
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
