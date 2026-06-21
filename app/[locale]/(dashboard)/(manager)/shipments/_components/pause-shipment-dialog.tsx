'use client';
import {PauseShipment} from '@/app/[locale]/(dashboard)/(manager)/shipments/[id]/_actions';
import DeleteDialog from '@/components/dashboard/delete-dialog';
import {toast} from 'sonner';
import {useState, useTransition} from 'react';

const PauseShipmentDialog = ({id}: {id: string}) => {
  const [isPending, startTransition] = useTransition();
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
  return <DeleteDialog title='توقيف الشحنة' actionText='توقيف' triggerText='توقيف الشحنة' description='هل انت متاكد من توقيف الشحنة' onclick={handlePauseShipment} isLoading={isPending} open={open} setOpen={setOpen} />;
};

export default PauseShipmentDialog;
