import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { useTranslation } from '@/contexts/TranslationContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Plus, Search, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Translation, getPageOptions } from '@/utils/translationUtils';

export default function AdminTranslations() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentTranslation, setCurrentTranslation] = useState<Translation | null>(null);
  const [formData, setFormData] = useState({
    key: '',
    en: '',
    es: '',
    page: 'common',
  });

  const pageOptions = getPageOptions();

  // Fetch translations
  const { data: translations, isLoading } = useQuery({
    queryKey: ['admin-translations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('translations')
        .select('*')
        .order('key');
      
      if (error) {
        toast({
          title: 'Error loading translations',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return data as Translation[];
    }
  });

  // Create translation mutation
  const createTranslation = useMutation({
    mutationFn: async (data: Omit<Translation, 'id'>) => {
      const { error, data: result } = await supabase
        .from('translations')
        .insert([data])
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-translations'] });
      toast({ title: 'Translation created successfully' });
      setDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error creating translation', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  });

  // Update translation mutation
  const updateTranslation = useMutation({
    mutationFn: async ({ id, ...data }: Translation) => {
      const { error } = await supabase
        .from('translations')
        .update(data)
        .eq('id', id);

      if (error) throw error;
      return { id, ...data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-translations'] });
      toast({ title: 'Translation updated successfully' });
      setDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error updating translation', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  });

  // Delete translation mutation
  const deleteTranslation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('translations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-translations'] });
      toast({ title: 'Translation deleted successfully' });
      setDeleteDialogOpen(false);
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error deleting translation', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  });

  const filteredTranslations = translations?.filter(translation => 
    translation.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    translation.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
    translation.es.toLowerCase().includes(searchQuery.toLowerCase()) ||
    translation.page.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      key: '',
      en: '',
      es: '',
      page: 'common',
    });
    setCurrentTranslation(null);
  };

  const openDialog = (translation?: Translation) => {
    if (translation) {
      setCurrentTranslation(translation);
      setFormData({
        key: translation.key,
        en: translation.en,
        es: translation.es,
        page: translation.page,
      });
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const openDeleteDialog = (translation: Translation) => {
    setCurrentTranslation(translation);
    setDeleteDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (value: string) => {
    setFormData(prev => ({ ...prev, page: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (currentTranslation) {
        // Update existing translation
        updateTranslation.mutate({
          id: currentTranslation.id,
          ...formData
        });
      } else {
        // Create new translation
        createTranslation.mutate(formData);
      }
    } catch (error: any) {
      toast({ 
        title: 'Error', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  };

  const handleDelete = () => {
    if (currentTranslation) {
      deleteTranslation.mutate(currentTranslation.id);
    }
  };

  return (
    <AdminLayout title={t('admin.translations')}>
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('admin.search_translations')}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => openDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          {t('admin.add_translation')}
        </Button>
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
                <TableHead>{t('admin.key')}</TableHead>
                <TableHead>{t('admin.english')}</TableHead>
                <TableHead>{t('admin.spanish')}</TableHead>
                <TableHead>{t('admin.page')}</TableHead>
                <TableHead className="text-right">{t('admin.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTranslations?.length ? (
                filteredTranslations.map((translation) => (
                  <TableRow key={translation.id}>
                    <TableCell className="font-medium">{translation.key}</TableCell>
                    <TableCell>{translation.en}</TableCell>
                    <TableCell>{translation.es}</TableCell>
                    <TableCell>{translation.page}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openDialog(translation)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openDeleteDialog(translation)}
                        >
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    {searchQuery 
                      ? t('admin.no_translations_found')
                      : t('admin.no_translations')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentTranslation ? t('admin.edit_translation') : t('admin.add_translation')}
            </DialogTitle>
          </DialogHeader>
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
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                {t('admin.cancel')}
              </Button>
              <Button type="submit" disabled={createTranslation.isPending || updateTranslation.isPending}>
                {currentTranslation ? t('admin.update') : t('admin.create')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('admin.confirm_delete')}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>{t('admin.delete_confirmation')}</p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              {t('admin.cancel')}
            </Button>
            <Button 
              type="button" 
              variant="destructive"
              disabled={deleteTranslation.isPending}
              onClick={handleDelete}
            >
              {t('admin.delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
