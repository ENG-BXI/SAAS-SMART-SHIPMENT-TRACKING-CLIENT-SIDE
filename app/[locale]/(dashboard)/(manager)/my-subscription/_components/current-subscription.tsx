import React from 'react';
import {Badge} from '@/components/ui/badge';
import {CalendarDays, Check, ShieldCheck, X} from 'lucide-react';
import {SUBSCRIPTION_TEXT, TSubscriptionStatus} from '@/lib/Constant/enum';
import {cn, formattedDate} from '@/lib/utils';
import {Progress} from '@/components/ui/progress';
import {defaultFeatures} from './plans-data';

interface CurrentSubscriptionProps {
  status: TSubscriptionStatus;
  isYearly: boolean;
  price: number;
  startDate: string;
  endDate: string;
}

export default function CurrentSubscription({status, price, endDate, startDate, isYearly}: CurrentSubscriptionProps) {
  const isPending = status == 'pending';
  const start = formattedDate(startDate);
  const end = formattedDate(endDate);
  const today = new Date();
  const startDt = new Date(startDate);
  const endDt = new Date(endDate);
  // To Calculate How long time Reminder For your Subscription
  const totalDays = Math.max(0, Math.ceil((endDt.getTime() - startDt.getTime()) / (1000 * 60 * 60 * 24)));
  const elapsedDays = Math.max(0, Math.ceil((today.getTime() - startDt.getTime()) / (1000 * 60 * 60 * 24)));
  const remainingDays = Math.max(0, totalDays - elapsedDays);
  const progress = totalDays > 0 ? Math.min(100, Math.round((elapsedDays / totalDays) * 100)) : 0;

  const planLabel = isYearly ? 'اشتراك سنوي' : 'اشتراك شهري';
  const planHint = isYearly ? 'يمنح شركتك أفضل قيمة على المدى الطويل.' : 'مثالي للشركات التي تحتاج إلى مرونة الشهرية.';

  return (
    <section aria-label='Current subscription details' className='mb-10 p-5'>
      <div className='space-y-5'>
        <div className='flex flex-wrap items-start justify-between gap-4'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
            <div className='rounded-3xl border max-w-min border-green-600/10 bg-green-50 p-4 text-green-700'>
              <CalendarDays className='h-6 w-6' />
            </div>
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-400'>حالة اشتراك الشركة</p>
              <h3 className='mt-2 text-3xl font-extrabold tracking-tight text-slate-900'>{planLabel}</h3>
              <p className='mt-2 max-w-2xl text-sm leading-6 text-slate-600'>{planHint} استمتع بمتابعة كاملة للرسوم والتجديد من هنا.</p>
            </div>
          </div>

          <Badge className='rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-300' aria-label='Subscription status'>
            {SUBSCRIPTION_TEXT[status]}
          </Badge>
        </div>

        <div className='flex flex-wrap gap-4'>
          <CardInfo title='السعر' description='تكلفة الباقة الحالية' value={price} />
          <CardInfo title='تاريخ البداية' description='بداية فترة الاشتراك' value={isPending ? 'لم يحدد بعد' : start} />
          <CardInfo title='موعد التجديد' description={remainingDays !== null && !isPending ? `${remainingDays} يوم متبقي` : 'موعد التجديد غير متاح'} value={isPending ? 'لم يحدد بعد' : end} />
        </div>

        <div className='rounded-[28px] border border-slate-200 bg-slate-50 p-6'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-500'>تقدم فترة الاشتراك</p>
              <p className='mt-2 text-sm font-medium text-slate-700'>{progress}% مكتمل</p>
            </div>
            <div className='rounded-full bg-custom-primary-color/10 px-3 py-1 text-sm font-semibold text-custom-primary-color'>{elapsedDays !== totalDays && !isPending ? `${elapsedDays}/${totalDays} يوم` : 'غير متاح'}</div>
          </div>
          <div className='mt-4 h-2 overflow-hidden rounded-full bg-slate-200'>
            <Progress value={progress} className='rotate-180' aria-label='Subscription progress' />
          </div>
        </div>

        {!isPending && (
          <div className='rounded-[28px] border border-slate-200 bg-[#F8FAFD] p-6'>
            <div className='mb-4 flex items-center gap-3'>
              <ShieldCheck className='h-5 w-5 text-custom-primary-color' />
              <h4 className='text-base font-semibold text-slate-900'>مزايا الاشتراك</h4>
            </div>
            <ul className='space-y-3 text-sm text-slate-700'>
              {defaultFeatures.map((feature, index) => {
                return (
                  <li key={index} className='flex gap-3'>
                    <span className={cn('mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full p-0.5', feature.available ? 'bg-[#D8F5E5] text-custom-primary-color' : 'bg-[#f5d8dc] text-[#831b22]')}>{feature.available ? <Check className='stroke-3' /> : <X />}</span>
                    {feature.text}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

interface CardInfoProps {
  title: string;
  value: string | number;
  description: string;
}
function CardInfo({title, description, value}: CardInfoProps) {
  return (
    <div className='flex-1 min-w-60 rounded-[24px] border border-slate-200 bg-white p-5'>
      <p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-500'>{title}</p>
      <p className='mt-3 text-2xl font-bold text-slate-900'>{value}</p>
      <p className='mt-2 text-sm text-slate-500'>{description}</p>
    </div>
  );
}
