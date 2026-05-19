'use client';
import DeleteDialog from '@/components/dashboard/delete-dialog';
import {useTransition} from 'react';
import {toast} from 'sonner';
import {deleteCompany} from '../_action';
interface DeleteCompanyDialogProps {
  companyId: string;
  companyName: string;
}
const DeleteCompanyDialog = ({companyId, companyName}: DeleteCompanyDialogProps) => {
  const [isPending, startTransition] = useTransition();
  function DeleteCompany() {
    startTransition(async () => {
      const {error, message} = await deleteCompany(companyId);
      if (error) toast.error(message);
      else toast.success(message);
    });
  }
  return (
    <DeleteDialog
      onclick={() => {
        DeleteCompany();
      }}
      title={`هل انت متاكد من حدف الشركة ${companyName}`}
      triggerText={`حدف الشركة`}
      description={`الشركة ${companyName} سيتم حدفها نهائيا`}
      isLoading={isPending}
    />
  );
};

export default DeleteCompanyDialog;
