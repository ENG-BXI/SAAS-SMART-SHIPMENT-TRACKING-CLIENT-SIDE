'use client';
import DeleteDialog from '@/components/dashboard/delete-dialog';
import {useTransition} from 'react';
import {DeleteUser} from '../_actions';
import {toast} from 'sonner';

const DeleteUserDialog = ({id}: {id: string}) => {
  const [isPending, startTransition] = useTransition();
  function handleOnDelete() {
    startTransition(async () => {
      const {error, message} = await DeleteUser(id);
      if (error) toast.error(message);
      else toast.success(message);
    });
  }
  return <DeleteDialog title='حذف المستخدم' triggerText='حذف المستخدم' description='هل انت متاكد من حذف المستخدم' isLoading={isPending} onclick={handleOnDelete} />;
};

export default DeleteUserDialog;
