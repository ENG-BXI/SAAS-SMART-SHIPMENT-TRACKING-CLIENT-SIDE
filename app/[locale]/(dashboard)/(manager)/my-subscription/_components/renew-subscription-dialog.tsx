'use client';

import {useState, useTransition} from 'react';

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

import {Upload, Loader2} from 'lucide-react';
import {toast} from 'sonner';

import {changeCompanySubscription} from '../_actions';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscriptionTypeId: string;
}

export default function RenewSubscriptionDialog({open, onOpenChange, subscriptionTypeId}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    if (!file) {
      toast.error('يرجى رفع سند الدفع');
      return;
    }
    startTransition(async () => {
      const formData = new FormData();
      formData.append('receipt', file);
      const {error, message} = await changeCompanySubscription(subscriptionTypeId, formData);
      if (error) {
        toast.error(message);
      } else {
        toast.success(message);
        onOpenChange(false);
        setFile(null);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>تجديد الاشتراك</DialogTitle>

          <DialogDescription>قم برفع سند الدفع لإرسال طلب التجديد</DialogDescription>
        </DialogHeader>

        <div className='space-y-5'>
          <div className='rounded-2xl border border-dashed p-6'>
            <div className='mb-4 flex flex-col items-center gap-2'>
              <Upload className='h-8 w-8 text-muted-foreground' />

              <p className='text-sm text-muted-foreground'>اختر صورة السند</p>
            </div>

            <Input
              type='file'
              accept='image/*'
              onChange={e => {
                setFile(e.target.files?.[0] ?? null);
              }}
            />

            {file && <p className='mt-3 text-sm'>{file.name}</p>}
          </div>

          <Button className='w-full' disabled={isPending} onClick={handleSubmit}>
            {isPending ? (
              <>
                <Loader2 className='me-2 h-4 w-4 animate-spin' />
                جاري الإرسال
              </>
            ) : (
              'إرسال طلب التجديد'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
