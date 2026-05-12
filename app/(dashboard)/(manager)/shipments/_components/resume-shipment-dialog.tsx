'use client';
import {ResumeShipment} from '@/app/(dashboard)/(manager)/shipments/[id]/_actions';
import DeleteDialog from '@/components/dashboard/delete-dialog';
import {toast} from 'sonner';
import {useState, useTransition} from 'react';

const ResumeShipmentDialog = ({id}: {id: string}) => {
  const [isPending, startTransition] = useTransition();
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
  return <DeleteDialog title='استئناف الشحنة' triggerText='استئناف الشحنة' description='هل انت متاكد من استئناف الشحنة' actionText='استئناف' onclick={handleResumeShipment} isLoading={isPending} open={open} setOpen={setOpen}/>;
};

export default ResumeShipmentDialog;
