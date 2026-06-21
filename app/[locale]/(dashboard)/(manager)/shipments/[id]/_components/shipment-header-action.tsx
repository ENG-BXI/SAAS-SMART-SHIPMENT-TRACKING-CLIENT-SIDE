'use client';
import CustomButton from '@/components/custom-button';
import {ArrowRight} from 'lucide-react';
import {useTransition} from 'react';
import {MoveShipmentWithNotification, MoveShipmentWithoutNotification, PauseShipment, ResumeShipment} from '../_actions';
import {toast} from 'sonner';
import {SHIPMENT_STATUS, TShipmentStatus} from '@/lib/Constant/enum';
interface ShipmentHeaderActionProps {
  id: string;
  status: TShipmentStatus;
}
function ShipmentHeaderAction({id, status}: ShipmentHeaderActionProps) {
  const [isPendingMoveWithNotification, startTransitionMoveWithNotification] = useTransition();
  const [isPendingMoveWithoutNotification, startTransitionMoveWithoutNotification] = useTransition();
  const [isPendingPause, startTransitionPause] = useTransition();
  const [isPendingResume, startTransitionResume] = useTransition();

  function handleMoveShipmentWithNotification() {
    startTransitionMoveWithNotification(async () => {
      const {message, error} = await MoveShipmentWithNotification(id);
      if (error) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    });
  }
  function handleMoveShipmentWithoutNotification() {
    startTransitionMoveWithoutNotification(async () => {
      const {message, error} = await MoveShipmentWithoutNotification(id);
      if (error) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    });
  }
  function handleStopShipment() {
    startTransitionPause(async () => {
      const {message, error} = await PauseShipment(id);
      if (error) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    });
  }
  function handleResumeShipment() {
    startTransitionResume(async () => {
      const {message, error} = await ResumeShipment(id);
      if (error) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    });
  }
  return (
    <div className='flex flex-wrap gap-2'>
      {status !== SHIPMENT_STATUS.COMPLETED && (
        <>
          <CustomButton text={isPendingMoveWithNotification ? '...جارى التحريك' : 'تحريك'} icon={<ArrowRight />} type='primary' onClick={() => handleMoveShipmentWithNotification()} />
          <CustomButton text={isPendingMoveWithoutNotification ? '...جارى التحريك بدون اشعار' : 'تحريك بدون اشعار'} type='primary' className='bg-[#104631]' onClick={() => handleMoveShipmentWithoutNotification()} />
        </>
      )}
      {status === SHIPMENT_STATUS.CURRENT && <CustomButton text={isPendingPause ? '...جارى التوقيف' : 'توقيف'} type='danger' onClick={() => handleStopShipment()} />}
      {status === SHIPMENT_STATUS.PAUSED && <CustomButton text={isPendingResume ? '...جارى الاستئناف' : 'استئناف'} type='primary' className='bg-[#104631]' onClick={() => handleResumeShipment()} />}
    </div>
  );
}

export default ShipmentHeaderAction;
