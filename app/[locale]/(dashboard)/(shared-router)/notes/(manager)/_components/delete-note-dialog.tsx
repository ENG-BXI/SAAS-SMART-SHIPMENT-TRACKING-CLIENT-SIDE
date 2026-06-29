'use client';
import DeleteDialog from '@/components/dashboard/delete-dialog';
import React, {useTransition} from 'react';
import {DeleteNote} from '../_actions';
import {toast} from 'sonner';
import { useTranslations } from 'next-intl';
interface DeleteNoteDialogProps {
  id: string;
}
const DeleteNoteDialog = ({ id }: DeleteNoteDialogProps) => {
  const t = useTranslations('notesPage.deleteDialog');
  const [isPending, startTransition] = useTransition();
  function handleOnDelete() {
    startTransition(async () => {
      const {error, message} = await DeleteNote(id);
      if (error) toast.error(message);
      else toast.success(message);
    });
  }
  return <DeleteDialog title={t('title')} triggerText={t('triggerText')} description={t('description')} actionText={t('action')} isLoading={isPending} onclick={handleOnDelete} />;
};

export default DeleteNoteDialog;
