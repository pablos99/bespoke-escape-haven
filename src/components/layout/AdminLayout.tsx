
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { adminNavigation } from '../navigation/navigation-data';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';
import { LogOut, LayoutDashboard } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-muted/30 border-r border-border">
          <div className="p-4 flex items-center border-b border-border">
            <LayoutDashboard className="mr-2 h-6 w-6" />
            <h1 className="text-xl font-semibold">{t('admin.title')}</h1>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {adminNavigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block px-4 py-2 rounded-md hover:bg-muted transition-colors"
                  >
                    {t(item.name)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-border mt-auto">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t('auth.logout')}
            </Button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <header className="border-b border-border p-4 bg-background">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{title}</h1>
              {user && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              )}
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
