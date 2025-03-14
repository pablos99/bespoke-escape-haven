
import React from 'react';
import { UserMenu } from '@/components/auth/UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';

export function ProfileMenu() {
  const { user } = useAuth();
  const { t } = useTranslation();
  
  if (user) {
    return (
      <div className="flex items-center gap-4">
        <UserMenu />
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
        <Link to="/auth/login">{t('auth.login')}</Link>
      </Button>
      <Button asChild size="sm" className="hidden sm:inline-flex">
        <Link to="/auth/signup">{t('auth.signup')}</Link>
      </Button>
    </div>
  );
}
