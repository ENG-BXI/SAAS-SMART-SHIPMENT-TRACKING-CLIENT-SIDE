import { Badge } from "@/components/ui/badge";
import { SUBSCRIPTION_TEXT, TSubscriptionStatus } from "@/lib/Constant/enum";
import { formattedDate } from "@/lib/utils";
import { IconArrowNarrowLeft } from "@tabler/icons-react";

interface SubscriptionSectionProps {
  status: TSubscriptionStatus;
  startDate: string;
  endDate: string;
  remainingDays: number;
}
export function SubscriptionSection({status, startDate, endDate, remainingDays}: SubscriptionSectionProps) {
  return (
    <>
      <div className='flex items-start justify-between my-4'>
        <h4 className='text-nowrap'>حالة الاشتراك</h4>
        <div className='w-130 flex flex-col gap-y-1'>
          <Badge variant='outline' className='border-[#067647] text-md text-[#085D3A] rounded-sm'>
            {SUBSCRIPTION_TEXT[status]}
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
              بداية الاشتراك: {formattedDate(startDate)}
            </Badge>
            <IconArrowNarrowLeft className='text-[#93370D]' />
            <Badge variant='outline' className='border-[#93370D] text-md text-[#93370D] rounded-sm'>
              نهاية الاشتراك: {formattedDate(endDate)}
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}
