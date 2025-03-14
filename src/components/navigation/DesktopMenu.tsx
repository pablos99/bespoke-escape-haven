
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from '@/contexts/TranslationContext';
import { NavigationItem } from './types';
import { ChevronDown } from 'lucide-react';

interface DesktopMenuProps {
  navigation: NavigationItem[];
}

export function DesktopMenu({ navigation }: DesktopMenuProps) {
  const location = useLocation();
  const { t } = useTranslation();
  
  return (
    <nav className="hidden md:flex space-x-10">
      {navigation.map((item) => {
        if (item.submenu) {
          return (
            <DropdownMenu key={item.name}>
              <DropdownMenuTrigger className={cn(
                'flex items-center text-sm transition-all duration-200 hover:text-primary',
                (location.pathname === item.href || location.pathname.startsWith(item.href + '/'))
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              )}>
                {t(item.name)} <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover/95 backdrop-blur-sm">
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
  );
}
