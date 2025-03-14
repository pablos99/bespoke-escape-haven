
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
    return <UserMenu />;
  }
  
  return null;
}
