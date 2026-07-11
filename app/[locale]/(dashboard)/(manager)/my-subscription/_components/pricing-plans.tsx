'use client';
import {Badge} from '@/components/ui/badge';
import {Check, ShieldCheck, CalendarRange, Sparkles} from 'lucide-react';
import {useTransition} from 'react';
import {changeCompanySubscription} from '../_actions';
import {toast} from 'sonner';
import {TSubscriptionStatus} from '@/lib/Constant/enum';
import {useTranslations} from 'next-intl';
import {Card, CardContent} from '@/components/ui/card';
interface ISubscription {
  id: string;
  type: string;
  price: number;
  durationByMonth: number;
}
interface PricingPlansProps {
  currentPlan: string;
  status: TSubscriptionStatus;
  plans: ISubscription[];
}
export default function PricingPlans({currentPlan, status, plans}: PricingPlansProps) {
  const t = useTranslations('subscriptionPage.pricing');
  const tFeature = useTranslations('subscriptionPage.features');
  const [isPending, startTransition] = useTransition();
  const features = tFeature.raw('items') as string[];
  const isExpire = status == 'expired';
  const handleOpenUpgrade = (subscriptionTypeId: string) => {
    if (!subscriptionTypeId) return;
    startTransition(async () => {
      const {error, message} = await changeCompanySubscription(subscriptionTypeId);
      if (!error) toast.success(message);
      else toast.error(message);
    });
  };
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch mb-14 max-w-7xl mx-auto'>
      {plans.map(plan => {
        const isCurrent = plan.type === currentPlan;
        const isBest = plan.type === 'Yearly';
        const isYearly = plan.durationByMonth >= 12;
        const duration = isYearly ? plan.durationByMonth / 12 : plan.durationByMonth;
        return (
          <Card key={plan.id} className={`relative rounded-[28px] border flex flex-col justify-between transition-all duration-300 ${isCurrent ? 'border-custom-primary-color shadow-[0_20px_60px_-35px_rgba(27,131,84,0.9)] ring-2 ring-custom-primary-color/10' : 'border-gray-200 dark:border-slate-600 shadow-sm hover:shadow-md'}`}>
            <CardContent>
              {/* Best badge */}
              {isBest && !isCurrent && (
                <div className='absolute -top-3.5 left-1/2 -translate-x-1/2'>
                  <Badge className='bg-custom-primary-color text-white text-xs px-3.5 py-1 font-bold rounded-full flex items-center gap-x-1'>
                    <Sparkles className='h-3.5 w-3.5 text-amber-300 animate-spin' />
                    {t('bestValue')}
                  </Badge>
                </div>
              )}
              {/* Current badge */}
              {isCurrent && (
                <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
                  <Badge className='bg-gray-900 dark:bg-slate-700 text-white text-xs px-3.5 py-0.5 font-semibold rounded-full'>{t('currentPlan')}</Badge>
                </div>
              )}
              {/* Header */}
              <div className='p-6 pb-3'>
                <div className='flex items-center justify-between gap-4'>
                  <div className='flex items-center gap-3'>
                    <div className='rounded-2xl border border-gray-100 bg-gray-50 p-3 text-custom-primary-color'>
                      <CalendarRange className='h-5 w-5' />
                    </div>
                    <div>
                      <p className='text-xs font-semibold uppercase tracking-[0.15em] text-slate-500'>{t('billing')}</p>
                      <h4 className='text-lg font-bold'>{plan.type}</h4>
                    </div>
                  </div>
                  {isBest && <Badge className='text-xs font-semibold rounded-full px-3 py-0.5 border bg-gray-100 text-slate-700'>{t('bestValue')}</Badge>}
                </div>
                <p className='mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400 min-h-18'>{t('description')}</p>
                {/* Pricing info */}
                <Card className='mt-6 rounded-[24px]'>
                  <CardContent className='px-4'>
                    <div className='flex items-center justify-between text-sm'>
                      <span>{t('pricing')}</span>
                      <span className='font-semibold'>{plan.price}</span>
                    </div>
                    <div className='mt-2 flex items-center justify-between text-sm'>
                      <span>{t('billing')}</span>
                      <span className='font-semibold'>{isYearly ? t('yearly') : t('monthly')}</span>
                    </div>
                    <div className='mt-2 flex items-center justify-between text-sm'>
                      <span>{t('duration')}</span>
                      <span className='font-semibold'>
                        {duration} {isYearly ? t('yearly') : t('monthly')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <div className='h-px bg-gray-100 my-6' />
                <h5 className='text-sm font-semibold text-slate-900'>{t('currentPlan')}</h5>
                {/* Features */}
                <ul className='mt-4 space-y-3'>
                  {features.map((feature, index) => (
                    <li key={index} className='flex items-start gap-x-3 text-sm text-slate-700 dark:text-slate-400'>
                      <Check className={`mt-0.5 h-4 w-4'text-custom-primary-color'`} />
                      <span className={'font-medium'}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Button */}
              <div className='p-6 pt-4 mt-auto'>
                <button type='button' disabled={isPending || status === 'change' || (currentPlan === plan.type && !isExpire)} onClick={() => handleOpenUpgrade(plan.id)} title={status === 'change' ? t('status.change') : plan.type} className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-x-2 ${isCurrent && !isExpire ? 'bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-500 text-gray-400 dark:text-white cursor-not-allowed' : 'bg-custom-primary-color text-white hover:bg-[#156742]'}`}>
                  {isCurrent && !isExpire ? (
                    <>
                      <ShieldCheck className='h-4 w-4' />
                      {t('selected')}
                    </>
                  ) : isExpire ? (
                    'تجديد الاشتراك'
                  ) : (
                    t('selectPlan')
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
