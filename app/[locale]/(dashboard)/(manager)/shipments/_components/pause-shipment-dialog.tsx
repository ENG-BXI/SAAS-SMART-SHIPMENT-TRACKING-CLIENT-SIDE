'use client';
import {PauseShipment} from '@/app/[locale]/(dashboard)/(manager)/shipments/[id]/_actions';
import DeleteDialog from '@/components/dashboard/delete-dialog';
import {toast} from 'sonner';
import {useState, useTransition} from 'react';
import { useTranslations } from 'next-intl';

const PauseShipmentDialog = ({id}: {id: string}) => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('shipments.dialog.confirm.pause');

  const [open, setOpen] = useState(false);
  const handlePauseShipment = () => {
    startTransition(async () => {
      const {error, message} = await PauseShipment(id);
      if (error) {
        toast.error(error);
      } else {
        toast.success(message);
        setOpen(false);
      }
    });
  };
  return <DeleteDialog title={t('title')} triggerText={t('trigger')} description={t('description')} actionText={t('action')} onclick={handlePauseShipment} isLoading={isPending} open={open} setOpen={setOpen} />;
};

export default PauseShipmentDialog;
