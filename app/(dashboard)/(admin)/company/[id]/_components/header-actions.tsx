'use client';
import CustomButton from '@/components/custom-button';
import {SUBSCRIPTION_STATUS, TSubscriptionStatus} from '@/lib/Constant/enum';
import {StopCircle} from 'lucide-react';
import {useTransition} from 'react';
import {activeCompanySubscription, pauseCompanySubscription} from '../_actions';
import {toast} from 'sonner';

const HeaderActions = ({status, id}: {status: TSubscriptionStatus; id: string}) => {
  const [isPending, startTransition] = useTransition();
  function handleChangeStatus(status: 'active' | 'inActive') {
    if (status == 'inActive') {
      startTransition(async () => {
        const {error, message} = await pauseCompanySubscription(id);
        if (error) {
          toast.error(message);
        } else toast.success(message);
      });
    } else if (status == 'active') {
      startTransition(async () => {
        const {error, message} = await activeCompanySubscription(id);
        if (error) {
          toast.error(message);
        } else toast.success(message);
      });
    }
  }
  return (
    <div className='flex'>
      {status == SUBSCRIPTION_STATUS.ACTIVE && <CustomButton disable={isPending} onClick={() => handleChangeStatus('inActive')} text='توقيف اشتراك الشركة' type='danger' icon={<StopCircle className='' />} />}
      {status == SUBSCRIPTION_STATUS.INACTIVE && <CustomButton disable={isPending} onClick={() => handleChangeStatus('active')} text='تفعيل اشتراك الشركة' type='primary' icon={<StopCircle className='' />} />}
    </div>
  );
};

export default HeaderActions;
