'use client';
import {Badge} from '@/components/ui/badge';
import {Check, ShieldCheck, CalendarRange, Sparkles} from 'lucide-react';
import {defaultFeatures} from './plans-data';
import {useTransition} from 'react';
import {changeCompanySubscription} from '../_actions';
import {toast} from 'sonner';
import { TSubscriptionStatus } from '@/lib/Constant/enum';

interface ISubscription {
  id: string;
  type: string;
  price: number;
  durationByMonth: number;
}
interface PricingPlansProps {
  currentPlan: string;
  status:TSubscriptionStatus
  plans: ISubscription[];
}

export default function PricingPlans({currentPlan,status, plans}: PricingPlansProps) {
  const [isPending, startTransition] = useTransition();
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
        const isCurrent = plan.type == currentPlan;
        // Temp Choose
        const isBest = plan.type == 'Yearly';
        const isYearly = plan.durationByMonth >= 12;
        const duration = isYearly ? plan.durationByMonth / 12 : plan.durationByMonth;
        return (
          <div key={plan.id} className={`relative bg-white rounded-[28px] border flex flex-col justify-between transition-all duration-300 ${isCurrent ? 'border-custom-primary-color shadow-[0_20px_60px_-35px_rgba(27,131,84,0.9)] ring-2 ring-custom-primary-color/10' : 'border-gray-200 shadow-sm hover:shadow-md'}`}>
            {isBest && !isCurrent && (
              <div className='absolute -top-3.5 left-1/2 -translate-x-1/2'>
                <Badge className='bg-custom-primary-color text-white text-xs px-3.5 py-1 border-none font-bold rounded-full shadow-sm flex items-center gap-x-1'>
                  <Sparkles className='h-3.5 w-3.5 text-amber-300 animate-spin' style={{animationDuration: '4s'}} />
                  أفضل قيمة
                </Badge>
              </div>
            )}

            {isCurrent && (
              <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
                <Badge className='bg-gray-900 text-white text-xs px-3.5 py-0.5 border-none font-semibold rounded-full'>الباقة الحالية</Badge>
              </div>
            )}

            <div className='p-6 pb-3'>
              <div className='flex items-center justify-between gap-4'>
                <div className='flex items-center gap-3'>
                  <div className='rounded-2xl border border-gray-100 bg-gray-50 p-3 text-custom-primary-color'>
                    <CalendarRange className='h-5 w-5' />
                  </div>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.15em] text-slate-500'>الخطة</p>
                    <h4 className='text-lg font-bold text-slate-900'>{plan.type}</h4>
                  </div>
                </div>
                <Badge className={`text-xs font-semibold rounded-full px-3 py-0.5 border ${isBest ?? 'border-gray-200 bg-gray-100 text-slate-700'}`}>{isBest ? 'أفضل قيمة' : 'مرن'}</Badge>
              </div>

              <p className='mt-4 text-sm leading-6 text-slate-600 min-h-18'>خطة مصممة خصيصاً لتلبية احتياجات الشركة في إدارة الشحنات والفواتير.</p>

              <div className='mt-6 rounded-[24px] border border-gray-100 bg-[#F7FDF4] px-4 py-4'>
                <div className='flex items-center justify-between text-sm text-slate-700'>
                  <span>السعر</span>
                  <span className='font-semibold text-slate-900'>{plan.price}</span>
                </div>
                <div className='mt-2 flex items-center justify-between text-sm text-slate-700'>
                  <span>دورة الفوترة</span>
                  <span className='font-semibold text-slate-900'>{isYearly ? 'سنوي' : 'شهري'}</span>
                </div>
                <div className='mt-2 flex items-center justify-between text-sm text-slate-700'>
                  <span>مدة الاشتراك</span>
                  <span className='font-semibold text-slate-900'>
                    {duration} {isYearly ? 'سنة' : 'شهر'}
                  </span>
                </div>
              </div>

              <div className='h-px bg-gray-100 my-6' />

              <h5 className='text-sm font-semibold text-slate-900'>ما ستحصل عليه</h5>
              <ul className='mt-4 space-y-3'>
                {defaultFeatures.map((feature, index) => (
                  <li key={index} className='flex items-start gap-x-3 text-sm text-slate-700'>
                    <Check className={`mt-0.5 h-4 w-4 ${feature.available ? 'text-custom-primary-color' : 'text-gray-300'}`} />
                    <span className={feature.available ? 'font-medium' : 'text-gray-400 line-through'}>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className='p-6 pt-4 mt-auto'>
              <button
                type='button'
                disabled={isPending || status=='active'}
                onClick={() => {
                  handleOpenUpgrade(plan.id);
                }}
                title={status=='change'?'طلبك السابق تحت المراجعه':plan.type}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-x-2 ${isCurrent ? 'bg-gray-50 border border-gray-200 text-gray-400 cursor-not-allowed font-medium' : isBest ? 'bg-custom-primary-color text-white hover:bg-[#156742] shadow-sm hover:shadow-md' : 'bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300'} ${status=='change'&&'cursor-not-allowed!'}`}
              >
                {isCurrent ? (
                  <>
                    <ShieldCheck className='h-4 w-4' />
                    باقتك الحالية النشطة
                  </>
                ) : (
                  <>اختيار هذه الباقة</>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
