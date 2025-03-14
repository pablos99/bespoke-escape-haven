
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { adminNavigation } from '../navigation/navigation-data';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';
import { LogOut, LayoutDashboard, Building, Languages, ShoppingCart, User, BookOpen, Map } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

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

  // Get user initials for avatar
  const getInitials = () => {
    if (!user?.email) return 'A';
    const parts = user.email.split('@');
    return parts[0].substring(0, 2).toUpperCase();
  };

  // Function to get the icon component based on icon name
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'LayoutDashboard': return <LayoutDashboard className="h-5 w-5" />;
      case 'Building': return <Building className="h-5 w-5" />;
      case 'Languages': return <Languages className="h-5 w-5" />;
      case 'ShoppingCart': return <ShoppingCart className="h-5 w-5" />;
      case 'User': return <User className="h-5 w-5" />;
      case 'BookOpen': return <BookOpen className="h-5 w-5" />;
      case 'Map': return <Map className="h-5 w-5" />;
      default: return <LayoutDashboard className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-muted/30 border-r border-border flex flex-col">
          <div className="p-4 flex items-center border-b border-border">
            <LayoutDashboard className="mr-2 h-6 w-6" />
            <h1 className="text-xl font-semibold">{t('admin.title')}</h1>
          </div>
          
          {/* Admin user profile */}
          {user && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="" alt={user.email || ''} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{user.email}</p>
                  <p className="text-xs text-muted-foreground">{t('admin.role')}</p>
                </div>
              </div>
            </div>
          )}
          
          <nav className="p-4 flex-1 overflow-auto">
            <ul className="space-y-2">
              {adminNavigation.map((item) => {
                const isActive = window.location.pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center px-4 py-2 rounded-md hover:bg-muted transition-colors",
                        isActive && "bg-muted font-medium"
                      )}
                    >
                      <span className="mr-3">{getIcon(item.icon)}</span>
                      {t(item.name)}
                    </Link>
                  </li>
                );
              })}
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
