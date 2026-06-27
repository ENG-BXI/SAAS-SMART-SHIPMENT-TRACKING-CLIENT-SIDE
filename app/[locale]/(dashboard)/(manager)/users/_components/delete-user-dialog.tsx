'use client';
import DeleteDialog from '@/components/dashboard/delete-dialog';
import {useTransition} from 'react';
import {DeleteUser} from '../_actions';
import {toast} from 'sonner';
import {useMe} from '@/services/me';
import { useTranslations } from 'next-intl';

const DeleteUserDialog = ({id}: {id: string}) => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('usersPage.deleteDialog');
  const {data} = useMe();
  function handleOnDelete() {
    startTransition(async () => {
      const {error, message} = await DeleteUser(id);
      if (error) toast.error(message);
      else toast.success(message);
    });
  }
  if (id == data?.id) return null;
  return <DeleteDialog title={t('title')} triggerText={t('triggerText')} description={t('description')} isLoading={isPending} onclick={handleOnDelete} />;
};

export default DeleteUserDialog;
