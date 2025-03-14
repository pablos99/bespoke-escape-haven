
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import { useTranslation } from '@/contexts/TranslationContext';
import { DestinationFormData } from '@/types/destination';

interface DestinationFormProps {
  formData: DestinationFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSwitchChange: (name: string, checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isEdit: boolean;
}

export const DestinationForm: React.FC<DestinationFormProps> = ({
  formData,
  onInputChange,
  onSwitchChange,
  onSubmit,
  onCancel,
  isEdit
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Name</Label>
          <Input 
            id="name" 
            name="name"
            value={formData.name}
            onChange={onInputChange}
            className="col-span-3"
            required
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">Description</Label>
          <Textarea 
            id="description" 
            name="description"
            value={formData.description}
            onChange={onInputChange}
            className="col-span-3" 
            required
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="country" className="text-right">Country</Label>
          <Input 
            id="country" 
            name="country"
            value={formData.country}
            onChange={onInputChange}
            className="col-span-3"
            required
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="image_url" className="text-right">Image URL</Label>
          <Input 
            id="image_url" 
            name="image_url"
            value={formData.image_url}
            onChange={onInputChange}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="properties_count" className="text-right">Properties Count</Label>
          <Input 
            id="properties_count" 
            name="properties_count"
            type="number"
            value={formData.properties_count}
            onChange={onInputChange}
            className="col-span-3"
            required
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="featured" className="text-right">Featured</Label>
          <div className="flex items-center space-x-2 col-span-3">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => onSwitchChange('featured', checked)}
            />
            <Label htmlFor="featured">
              {formData.featured ? 'Yes' : 'No'}
            </Label>
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEdit ? 'Update' : 'Save'}
        </Button>
      </DialogFooter>
    </form>
  );
};
