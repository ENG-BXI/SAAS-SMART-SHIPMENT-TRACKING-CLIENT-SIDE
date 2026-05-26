import React from 'react';
import {Badge} from '@/components/ui/badge';
import {Calendar, Clock, Info} from 'lucide-react';
import {Plan} from './plans-data';

interface CurrentSubscriptionProps {
  plan: Plan;
  currentPlanId: string;
}

export default function CurrentSubscription({plan, currentPlanId}: CurrentSubscriptionProps) {
  const IconComponent = plan.icon;

  return (
    <div className='mb-10 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md'>
      <div className='flex flex-col justify-between gap-8 lg:flex-row lg:items-start'>
        <div className='flex-1 space-y-5'>
          <div className='flex items-center gap-x-4'>
            <div className={`rounded-xl border p-4 ${currentPlanId === 'yearly' ? 'border-[#1B8354]/20 bg-[#1B8354]/10 text-[#1B8354]' : 'border-blue-100 bg-blue-50 text-blue-600'}`}>
              <IconComponent className='h-7 w-7 animate-pulse' />
            </div>
            <div>
              <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
                <h3 className='text-xl font-bold text-gray-900'>{plan.name}</h3>
                <Badge variant='outline' className='rounded-full border-[#067647] bg-[#E6F4EA] px-3 py-0.5 text-sm font-semibold text-[#085D3A]'>
                  نشط ومفعل
                </Badge>
              </div>
              <p className='mt-1 text-sm text-muted-foreground'>{plan.description}</p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-5 border-t border-gray-50 pt-3 md:grid-cols-3'>
            <div className='space-y-1'>
              <p className='text-xs font-medium text-muted-foreground'>تكلفة الاشتراك</p>
              <p className='text-base font-bold text-gray-900'>
                {plan.price}$ <span className='text-xs font-normal text-muted-foreground'>/ {plan.billingCycle}</span>
              </p>
            </div>
            <div className='space-y-1'>
              <p className='text-xs font-medium text-muted-foreground'>تاريخ البداية</p>
              <p className='flex items-center gap-x-1 text-sm font-semibold text-gray-800'>
                <Calendar className='h-4 w-4 text-muted-foreground' />
                1 مايو 2026
              </p>
            </div>
            <div className='space-y-1'>
              <p className='text-xs font-medium text-muted-foreground'>تاريخ التجديد القادم</p>
              <p className='flex items-center gap-x-1 text-sm font-semibold text-gray-800'>
                <Clock className='h-4 w-4 text-muted-foreground' />
                1 يونيو 2026
              </p>
            </div>
          </div>
        </div>

        <div className='w-full max-w-lg flex-1 border-t border-gray-100 pt-6 lg:border-r lg:border-t-0 lg:pr-8 lg:pt-0'>
          <div className='mb-4 flex items-center gap-x-2'>
            <Info className='h-4 w-4 text-[#1B8354]' />
            <h4 className='text-sm font-bold text-gray-900'>تفاصيل الباقة الحالية:</h4>
          </div>

          <div className='grid gap-3'>
            <div className='rounded-xl border border-gray-100 bg-gray-50/70 p-4'>
              <div className='flex items-center justify-between gap-4'>
                <span className='text-xs font-medium text-gray-500'>نوع الاشتراك</span>
                <span className='text-sm font-bold text-gray-900'>{plan.billingCycle}</span>
              </div>
            </div>

            <div className='rounded-xl border border-gray-100 bg-gray-50/70 p-4'>
              <div className='flex items-center justify-between gap-4'>
                <span className='text-xs font-medium text-gray-500'>مدة الباقة</span>
                <span className='text-sm font-bold text-gray-900'>{plan.durationText}</span>
              </div>
            </div>

            <div className='rounded-xl border border-amber-100 bg-amber-50 p-4'>
              <div className='flex items-start gap-x-2'>
                <Info className='mt-0.5 h-4 w-4 shrink-0 text-amber-600' />
                <p className='text-xs leading-relaxed text-amber-800'>تعرض هذه الصفحة بيانات الاشتراك المتوفرة في النظام: النوع، السعر، وفترة الاشتراك.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
