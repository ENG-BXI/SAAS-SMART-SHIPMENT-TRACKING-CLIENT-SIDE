'use client';

import DeleteDialog from '@/components/dashboard/delete-dialog';
import {DeleteClient} from '../_services/actions';
import {toast} from 'sonner';
import {useTransition} from 'react';

function DeleteClientDialog({id, name}: {id: string; name: string}) {
  const [isPending, startTransition] = useTransition();
  const deleteClient = async () => {
    startTransition(async () => {
      const response = await DeleteClient(id);
      if (response?.error) toast.error(response.error);
      else toast.success(response?.message);
    });
  };
  return (
    <DeleteDialog
      title={`حذف العميل ${name}`}
      triggerText='حذف العميل'
      description={`هل انت متاكد من حذف العميل ${name}`}
      isLoading={isPending}
      onclick={() => {
        deleteClient();
      }}
    />
  );
}

export default DeleteClientDialog;
