'use client';
import DeleteDialog from '@/components/dashboard/delete-dialog';
import {useTransition} from 'react';
import {DeleteShipmentItem} from '../_actions';
import {toast} from 'sonner';
import { useTranslations } from 'next-intl';

interface DeleteShipmentItemDialogProps {
  id: string;
  shipmentId: string;
}
const DeleteShipmentItemDialog = ({id, shipmentId}: DeleteShipmentItemDialogProps) => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('shipmentDetails.dialog.deleteItem');
  function handleOnDelete() {
    startTransition(async () => {
      const {error, message} = await DeleteShipmentItem(shipmentId, id);
      if (error) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    });
  }
  return <DeleteDialog title={t('title')} triggerText={t('trigger')} description={t('description')} actionText={t('action')} isLoading={isPending} onclick={handleOnDelete} />;
};

export default DeleteShipmentItemDialog;
