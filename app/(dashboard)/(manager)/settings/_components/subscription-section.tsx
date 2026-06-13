import {Badge} from '@/components/ui/badge';
import {IconArrowNarrowLeft} from '@tabler/icons-react';
import React from 'react';
import GetSubscriptionInfo from '../../my-subscription/_services/get-subscription-info';
import {cookies} from 'next/headers';
import {SUBSCRIPTION_TEXT} from '@/lib/Constant/enum';
import {formattedDate} from '@/lib/utils';

async function SubscriptionSection() {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const data = await GetSubscriptionInfo(token);
  const today = new Date();
  const startDt = new Date(data.startDate);
  const endDt = new Date(data.endDate);
  // To Calculate How long time Reminder For your Subscription
  const totalDays = Math.max(0, Math.ceil((endDt.getTime() - startDt.getTime()) / (1000 * 60 * 60 * 24)));
  const elapsedDays = Math.max(0, Math.ceil((today.getTime() - startDt.getTime()) / (1000 * 60 * 60 * 24)));
  const remainingDays = Math.max(0, totalDays - elapsedDays);
  return (
    <>
      <div className='flex items-start justify-between my-4'>
        <h4 className='text-nowrap'>حالة الاشتراك</h4>
        <div className='w-130 flex flex-col gap-y-1'>
          <Badge variant='outline' className='border-[#067647] text-md text-[#085D3A] rounded-sm'>
            {SUBSCRIPTION_TEXT[data.status]}
          </Badge>
          <p className='text-muted-foreground'>الاشتراك نشط ويمكن استخدام النظام بشكل كامل.</p>
        </div>
      </div>
      <div className='flex items-start justify-between my-4'>
        <h4 className='text-nowrap'>فترة الاشتراك</h4>
        <div className='w-130 flex flex-col gap-y-3'>
          <Badge variant='outline' className='border-[#067647] text-md text-[#085D3A] rounded-sm'>
            المدة المتبقية: {remainingDays} يوم
          </Badge>
          <div className='flex items-center gap-x-2'>
            <Badge variant='outline' className='border-[#93370D] text-md text-[#93370D] rounded-sm'>
              بداية الاشتراك: {formattedDate(data.startDate)}
            </Badge>
            <IconArrowNarrowLeft className='text-[#93370D]' />
            <Badge variant='outline' className='border-[#93370D] text-md text-[#93370D] rounded-sm'>
              نهاية الاشتراك: {formattedDate(data.endDate)}
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubscriptionSection;
