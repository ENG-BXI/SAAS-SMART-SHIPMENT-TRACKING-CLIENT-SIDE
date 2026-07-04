'use client';

import DeleteDialog from '@/components/dashboard/delete-dialog';
import {DeleteClient} from '../actions';
import {toast} from 'sonner';
import {useTransition} from 'react';
import { useTranslations } from 'next-intl';

function DeleteClientDialog({id, name}: {id: string; name: string}) {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('clientsPage.dialog.delete');

  const deleteClient = async () => {
    startTransition(async () => {
      const response = await DeleteClient(id);
      if (response?.error) toast.error(response.error);
      else toast.success(response?.message);
    });
  };
  return (
    <DeleteDialog
      title={t('title',{name})}
      triggerText={t('trigger')}
      description={t('description', { name })}
      actionText={t('action')}
      isLoading={isPending}
      onclick={() => {
        deleteClient();
      }}
    />
  );
}

export default DeleteClientDialog;
