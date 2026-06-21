'use client';
import DeleteDialog from '@/components/dashboard/delete-dialog';
import {toast} from 'sonner';
import {useTransition} from 'react';
import {DeleteShipmentAction} from '../actions';

const DeleteShipmentDialog = ({id}: {id: string}) => {
  const [isPending, startTransition] = useTransition();
  const handleDeleteShipment = () => {
    startTransition(async () => {
      const {error, message} = await DeleteShipmentAction(id);
      if (error) {
        toast.error(error);
      } else {
        toast.success(message);
      }
    });
  };
  return <DeleteDialog title='حذف الشحنة' triggerText='حذف الشحنة' description='هل انت متاكد من حذف الشحنة' onclick={handleDeleteShipment} isLoading={isPending} />;
};

export default DeleteShipmentDialog;
