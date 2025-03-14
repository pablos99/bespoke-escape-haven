
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from '@/contexts/AppContext';

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useApp();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Globe size={18} />
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
  );
}
