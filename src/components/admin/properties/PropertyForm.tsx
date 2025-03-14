
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Property } from '@/hooks/usePropertyManagement';
import { useTranslation } from '@/contexts/TranslationContext';

interface PropertyFormProps {
  formData: {
    title: string;
    description: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
    price_per_share: string;
    total_shares: string;
    available_shares: string;
    status: Property['status'];
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isPending: boolean;
  isEditMode: boolean;
}

export const PropertyForm: React.FC<PropertyFormProps> = ({
  formData,
  onInputChange,
  onStatusChange,
  onSubmit,
  onCancel,
  isPending,
  isEditMode
}) => {
  const { t } = useTranslation();
  const statusOptions: Property['status'][] = ['pending', 'active', 'sold_out', 'closed'];

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t('admin.property_title')}</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">{t('admin.status')}</Label>
            <Select value={formData.status} onValueChange={onStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder={t('admin.select_status')} />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">{t('admin.description')}</Label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={onInputChange}
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="address">{t('admin.address')}</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">{t('admin.city')}</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={onInputChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="state">{t('admin.state')}</Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">{t('admin.country')}</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip_code">{t('admin.zip_code')}</Label>
            <Input
              id="zip_code"
              name="zip_code"
              value={formData.zip_code}
              onChange={onInputChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price_per_share">{t('admin.price_per_share')}</Label>
            <Input
              id="price_per_share"
              name="price_per_share"
              type="number"
              value={formData.price_per_share}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="total_shares">{t('admin.total_shares')}</Label>
            <Input
              id="total_shares"
              name="total_shares"
              type="number"
              value={formData.total_shares}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="available_shares">{t('admin.available_shares')}</Label>
            <Input
              id="available_shares"
              name="available_shares"
              type="number"
              value={formData.available_shares}
              onChange={onInputChange}
              required
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
          {t('admin.cancel')}
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Processing...' : isEditMode ? t('admin.update') : t('admin.create')}
        </Button>
      </DialogFooter>
    </form>
  );
};
