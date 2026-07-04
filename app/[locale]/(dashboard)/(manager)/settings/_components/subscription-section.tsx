import {Badge} from '@/components/ui/badge';
import {IconArrowNarrowLeft} from '@tabler/icons-react';
import React from 'react';
import GetSubscriptionInfo from '../../my-subscription/_services/get-subscription-info';
import {cookies} from 'next/headers';
import {SUBSCRIPTION_TEXT} from '@/lib/Constant/enum';
import {formattedDate} from '@/lib/utils';
import { getTranslations } from 'next-intl/server';

async function SubscriptionSection() {
  const t = await getTranslations('settingsPage.subscriptionSection');
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
      <div className='flex gap-3 flex-col sm:flex-row sm:items-start justify-between my-4'>
        <h4 className='text-nowrap'>{t('status')}</h4>
        <div className='max-w-130 w-full flex flex-col gap-y-1'>
          <Badge variant='outline' className='border-[#067647] text-md text-[#085D3A] rounded-sm'>
            {SUBSCRIPTION_TEXT[data.status]}
          </Badge>
          <p className='text-muted-foreground'>{t('activeText')}</p>
        </div>
      </div>
      <div className='flex gap-3 flex-col sm:flex-row sm:items-start justify-between my-4'>
        <h4 className='text-nowrap'>{t('period')}</h4>
        <div className='max-w-130 w-full flex flex-col gap-y-3'>
          <Badge variant='outline' className='border-[#067647] text-md text-[#085D3A] rounded-sm'>
            {t('remaining', {days: remainingDays})}
          </Badge>
          <div className='flex flex-wrap items-center gap-x-2'>
            <Badge variant='outline' className='border-[#93370D] text-md text-[#93370D] rounded-sm'>
              {t('start', {date: formattedDate(data.startDate)})}
            </Badge>
            <IconArrowNarrowLeft className='text-[#93370D]' />
            <Badge variant='outline' className='border-[#93370D] text-md text-[#93370D] rounded-sm'>
              {t('end', {date: formattedDate(data.endDate)})}
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubscriptionSection;
