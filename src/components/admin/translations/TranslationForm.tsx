
import React, { useState, useEffect } from 'react';
import { Translation, getPageOptions } from '@/utils/translationUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { useTranslation } from '@/contexts/TranslationContext';

interface TranslationFormProps {
  translation?: Translation | null;
  onSubmit: (data: Omit<Translation, 'id'> & { id?: string }) => void;
  onCancel: () => void;
  isPending: boolean;
}

export function TranslationForm({ 
  translation, 
  onSubmit, 
  onCancel,
  isPending 
}: TranslationFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    key: '',
    en: '',
    es: '',
    page: 'common',
  });

  // Update form when translation changes
  useEffect(() => {
    if (translation) {
      setFormData({
        key: translation.key,
        en: translation.en,
        es: translation.es,
        page: translation.page,
      });
    } else {
      resetForm();
    }
  }, [translation]);

  const resetForm = () => {
    setFormData({
      key: '',
      en: '',
      es: '',
      page: 'common',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (value: string) => {
    setFormData(prev => ({ ...prev, page: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissionData = translation 
      ? { id: translation.id, ...formData } 
      : formData;
    
    console.log('Submitting translation data:', submissionData);
    onSubmit(submissionData);
  };

  const pageOptions = getPageOptions();

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="key">{t('admin.key')}</Label>
            <Input
              id="key"
              name="key"
              value={formData.key}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="page">{t('admin.page')}</Label>
            <Select value={formData.page} onValueChange={handlePageChange}>
              <SelectTrigger>
                <SelectValue placeholder={t('admin.select_page')} />
              </SelectTrigger>
              <SelectContent>
                {pageOptions.map((page) => (
                  <SelectItem key={page} value={page}>{page}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="en">{t('admin.english')}</Label>
          <Input
            id="en"
            name="en"
            value={formData.en}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="es">{t('admin.spanish')}</Label>
          <Input
            id="es"
            name="es"
            value={formData.es}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('admin.cancel')}
        </Button>
        <Button type="submit" disabled={isPending}>
          {translation ? t('admin.update') : t('admin.create')}
        </Button>
      </DialogFooter>
    </form>
  );
}
