
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { useTranslation } from '@/contexts/TranslationContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface Order {
  id: string;
  created_at: string;
  user_id: string;
  property_id: string;
  shares: number;
  price_per_share: number;
  total_amount: number;
  status: string;
  transaction_reference: string | null;
  user: {
    email: string;
    first_name: string;
    last_name: string;
  } | null;
  property: {
    title: string;
  } | null;
}

export default function AdminOrders() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Fetch orders
  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          user:user_id (email, first_name, last_name),
          property:property_id (title)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data as Order[];
    }
  });

  const filteredOrders = orders?.filter(order => {
    const searchLower = searchQuery.toLowerCase();
    return (
      order.id.toLowerCase().includes(searchLower) ||
      (order.user?.email || '').toLowerCase().includes(searchLower) ||
      (order.property?.title || '').toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower)
    );
  });

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <AdminLayout title={t('admin.orders')}>
      <div className="mb-6 flex items-center">
        <div className="relative w-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('admin.search_orders')}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.order_id')}</TableHead>
                <TableHead>{t('admin.date')}</TableHead>
                <TableHead>{t('admin.customer')}</TableHead>
                <TableHead>{t('admin.property')}</TableHead>
                <TableHead>{t('admin.amount')}</TableHead>
                <TableHead>{t('admin.status')}</TableHead>
                <TableHead className="text-right">{t('admin.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders?.length ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id.slice(0, 8)}</TableCell>
                    <TableCell>{formatDate(order.created_at)}</TableCell>
                    <TableCell>
                      {order.user 
                        ? `${order.user.first_name} ${order.user.last_name}`
                        : t('admin.unknown_user')}
                    </TableCell>
                    <TableCell>{order.property?.title || t('admin.unknown_property')}</TableCell>
                    <TableCell>${order.total_amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => viewOrderDetails(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    {searchQuery 
                      ? t('admin.no_orders_found') 
                      : t('admin.no_orders')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('admin.order_details')}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="py-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">{t('admin.order_id')}</h3>
                  <p>{selectedOrder.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">{t('admin.date')}</h3>
                  <p>{formatDate(selectedOrder.created_at)}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">{t('admin.customer')}</h3>
                <p>
                  {selectedOrder.user 
                    ? `${selectedOrder.user.first_name} ${selectedOrder.user.last_name}`
                    : t('admin.unknown_user')}
                </p>
                <p className="text-sm text-muted-foreground">{selectedOrder.user?.email || ''}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">{t('admin.property')}</h3>
                <p>{selectedOrder.property?.title || t('admin.unknown_property')}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">{t('admin.shares')}</h3>
                  <p>{selectedOrder.shares}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">{t('admin.price_per_share')}</h3>
                  <p>${selectedOrder.price_per_share.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">{t('admin.total_amount')}</h3>
                  <p className="font-medium">${selectedOrder.total_amount.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">{t('admin.status')}</h3>
                  <p>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs ${
                        selectedOrder.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : selectedOrder.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : selectedOrder.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {selectedOrder.status}
                    </span>
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">{t('admin.transaction_reference')}</h3>
                  <p>{selectedOrder.transaction_reference || t('admin.none')}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" onClick={() => setDialogOpen(false)}>
              {t('admin.close')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
