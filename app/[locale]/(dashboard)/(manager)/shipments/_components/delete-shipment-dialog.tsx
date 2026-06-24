'use client';
import DeleteDialog from '@/components/dashboard/delete-dialog';
import {toast} from 'sonner';
import {useTransition} from 'react';
import {DeleteShipmentAction} from '../actions';
import { useTranslations } from 'next-intl';

const DeleteShipmentDialog = ({id}: {id: string}) => {
  const [isPending, startTransition] = useTransition();
    const t = useTranslations('shipments.dialog.confirm.delete');

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
  return <DeleteDialog title={t('title')} triggerText={t('trigger')} description={t('description')} actionText={t('action')} onclick={handleDeleteShipment} isLoading={isPending} />;
};

export default DeleteShipmentDialog;
