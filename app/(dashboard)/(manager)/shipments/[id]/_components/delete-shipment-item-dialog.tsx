'use client';
import DeleteDialog from '@/components/dashboard/delete-dialog';
import {useTransition} from 'react';
import {DeleteShipmentItem} from '../_actions';
import {toast} from 'sonner';

interface DeleteShipmentItemDialogProps {
  id: string;
}
const DeleteShipmentItemDialog = ({id}: DeleteShipmentItemDialogProps) => {
  const [isPending, startTransition] = useTransition();
  function handleOnDelete() {
    startTransition(async () => {
      const {error, message} = await DeleteShipmentItem(id);
      if (error) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    });
  }
  return <DeleteDialog title='حدف الغرض' triggerText='حدف الغرض' description='هل انت متاكد من حدف الغرض' isLoading={isPending} onclick={handleOnDelete} />;
};

export default DeleteShipmentItemDialog;
