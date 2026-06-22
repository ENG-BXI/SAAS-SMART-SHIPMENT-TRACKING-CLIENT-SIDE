'use client';
import DeleteDialog from '@/components/dashboard/delete-dialog';
import {useTransition} from 'react';
import {toast} from 'sonner';
import {deleteCompany} from '../_action';
import { useTranslations } from 'next-intl';

interface DeleteCompanyDialogProps {
  companyId: string;
  companyName: string;
}
const DeleteCompanyDialog = ({companyId, companyName}: DeleteCompanyDialogProps) => {
  const t = useTranslations('adminCompaniesPage.deleteCompanyDialog');
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
      title={t('title', { companyName })}
      triggerText={t('triggerText')}
      description={t('description', { companyName })}
      isLoading={isPending}
    />
  );
};

export default DeleteCompanyDialog;
