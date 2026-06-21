'use client';
import DeleteDialog from '@/components/dashboard/delete-dialog';
import {useTransition} from 'react';
import {DeleteWay} from '../_actions';
import Cookies from 'universal-cookie';
import {toast} from 'sonner';

const DeleteWayDialog = ({id}: {id: string}) => {
  const cookie = new Cookies();
  const token = cookie.get('token');
  const [isPending, startTransitions] = useTransition();
  function handleOnDelete() {
    startTransitions(async () => {
      const {message, error} = await DeleteWay(id, token);
      if (error) {
        toast.error(error);
      } else toast.success(message);
    });
  }
  return <DeleteDialog title='حذف المسار' triggerText='حذف المسار' description='هل انت متاكد من حذف المسار' isLoading={isPending} onclick={handleOnDelete} />;
};

export default DeleteWayDialog;
