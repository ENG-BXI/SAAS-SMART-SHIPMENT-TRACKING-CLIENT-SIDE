'use client';

import DeleteDialog from '@/components/dashboard/delete-dialog';
import {useTransition} from 'react';
import {toast} from 'sonner';
import {deleteSubscriptionType} from '../_actions';

interface DeleteSubscriptionDialogProps {
  subscriptionId: string;
  subscriptionType: string;
}

const DeleteSubscriptionDialog = ({subscriptionId, subscriptionType}: DeleteSubscriptionDialogProps) => {
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
      title={`هل انت متاكد من حدف باقة ${subscriptionType}`}
      triggerText='حدف الباقة'
      description={`باقة ${subscriptionType} سيتم حدفها نهائيا اذا لم تكن مرتبطة بأي شركة.`}
      isLoading={isPending}
    />
  );
};

export default DeleteSubscriptionDialog;
