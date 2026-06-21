'use client';
import DeleteDialog from '@/components/dashboard/delete-dialog';
import React, {useTransition} from 'react';
import {DeleteNote} from '../_actions';
import {toast} from 'sonner';
interface DeleteNoteDialogProps {
  id: string;
}
const DeleteNoteDialog = ({id}: DeleteNoteDialogProps) => {
  const [isPending, startTransition] = useTransition();
  function handleOnDelete() {
    startTransition(async () => {
      const {error, message} = await DeleteNote(id);
      if (error) toast.error(message);
      else toast.success(message);
    });
  }
  return <DeleteDialog title='حذف الملاحظة' triggerText='حذف الملاحظة' description='هل انت متاكد من حذف الملاحظة' isLoading={isPending} onclick={handleOnDelete} />;
};

export default DeleteNoteDialog;
