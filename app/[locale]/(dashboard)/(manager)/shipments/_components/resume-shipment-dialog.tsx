'use client';
import {ResumeShipment} from '@/app/[locale]/(dashboard)/(manager)/shipments/[id]/_actions';
import DeleteDialog from '@/components/dashboard/delete-dialog';
import {toast} from 'sonner';
import {useState, useTransition} from 'react';
import {useTranslations} from 'next-intl';

const ResumeShipmentDialog = ({id}: {id: string}) => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('shipments.dialog.confirm.resume');

  const [open, setOpen] = useState(false);
  const handleResumeShipment = () => {
    startTransition(async () => {
      const {error, message} = await ResumeShipment(id);
      if (error) {
        toast.error(message);
      } else {
        toast.success(message);
        setOpen(false);
      }
    });
  };
  return <DeleteDialog title={t('title')} triggerText={t('trigger')} description={t('description')} actionText={t('action')} onclick={handleResumeShipment} isLoading={isPending} open={open} setOpen={setOpen} />;
};

export default ResumeShipmentDialog;
