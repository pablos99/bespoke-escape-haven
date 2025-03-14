
import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { useTranslation } from '@/contexts/TranslationContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Home, Globe, ShoppingCart } from 'lucide-react';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <AdminLayout title={t('admin.dashboard')}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.properties')}
            </CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {t('admin.manage_properties')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t('admin.properties_description')}
            </p>
            <Button 
              onClick={() => navigate('/admin/properties')}
              className="w-full mt-4"
            >
              {t('admin.manage')}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.translations')}
            </CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {t('admin.manage_translations')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t('admin.translations_description')}
            </p>
            <Button 
              onClick={() => navigate('/admin/translations')}
              className="w-full mt-4"
            >
              {t('admin.manage')}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.orders')}
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {t('admin.manage_orders')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t('admin.orders_description')}
            </p>
            <Button 
              onClick={() => navigate('/admin/orders')}
              className="w-full mt-4"
            >
              {t('admin.manage')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
