
import React from 'react';
import { Settings } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

export function SettingsMenu() {
  const { t } = useTranslation();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings size={20} />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{t('settings.title') || 'Settings'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-2 flex justify-between items-center cursor-default">
            <span>{t('settings.theme') || 'Theme'}</span>
            <ThemeToggle />
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2 flex justify-between items-center cursor-default">
            <span>{t('settings.language') || 'Language'}</span>
            <LanguageSwitcher />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
