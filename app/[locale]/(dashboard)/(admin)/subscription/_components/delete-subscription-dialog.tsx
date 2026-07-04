'use client';

import DeleteDialog from '@/components/dashboard/delete-dialog';
import {useTransition} from 'react';
import {toast} from 'sonner';
import {deleteSubscriptionType} from '../_actions';
import { useTranslations } from 'next-intl';

interface DeleteSubscriptionDialogProps {
  subscriptionId: string;
  subscriptionType: string;
}

const DeleteSubscriptionDialog = ({subscriptionId, subscriptionType}: DeleteSubscriptionDialogProps) => {
  const t = useTranslations('adminSubscriptionsPage.deleteDialog');
  const [isPending, startTransition] = useTransition();

  function deleteSubscription() {
    startTransition(async () => {
      const {error, message} = await deleteSubscriptionType(subscriptionId);
      if (error) toast.error(message);
      else toast.success(message);
    });
  }

  return (
    <DeleteDialog
      onclick={() => {
        deleteSubscription();
      }}
      title={t('title', { subscriptionType })}
      triggerText={t('triggerText')}
      description={t('description', { subscriptionType })}
      isLoading={isPending}
    />
  );
};

export default DeleteSubscriptionDialog;
