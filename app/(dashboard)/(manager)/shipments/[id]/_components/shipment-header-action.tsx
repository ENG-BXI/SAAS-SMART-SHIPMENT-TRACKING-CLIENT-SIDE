'use client';
import CustomButton from '@/components/custom-button';
import {ArrowRight} from 'lucide-react';
import {useTransition} from 'react';
import {MoveShipmentWithNotification, MoveShipmentWithoutNotification, PauseShipment, ResumeShipment} from '../_actions';
import {toast} from 'sonner';
interface ShipmentHeaderActionProps {
  id: string;
}
function ShipmentHeaderAction({ id }: ShipmentHeaderActionProps) {
  // TODO : Get Status Of Shipment From BC For Hide And Show Buttons
  const [isPending, startTransition] = useTransition();
  function handleMoveShipmentWithNotification() {
    startTransition(async () => {
      const {message, error} = await MoveShipmentWithNotification(id);
      if (error) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    });
  }
  function handleMoveShipmentWithoutNotification() {
    startTransition(async () => {
      const {message, error} = await MoveShipmentWithoutNotification(id);
      if (error) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    });
  }
  function handleStopShipment() {
    startTransition(async () => {
      const {message, error} = await PauseShipment(id);
      if (error) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    });
  }
  function handleResumeShipment() {
    startTransition(async () => {
      const {message, error} = await ResumeShipment(id);
      if (error) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    });
  }
  return (
    <div className='flex gap-2'>
      <CustomButton text={isPending ? '...جارى التحريك' : 'تحريك'} icon={<ArrowRight />} type='primary' onClick={() => handleMoveShipmentWithNotification()} />
      <CustomButton text='تحريك بدون اشعار' type='primary' className='bg-[#104631]' onClick={() => handleMoveShipmentWithoutNotification()} />
      <CustomButton text='توقيف' type='danger' onClick={() => handleStopShipment()} />
      {/* // TODO : Add Logic Of Disable Button If Not Pending And If Shipment Not Pause */}
      <CustomButton text='استئناف' type='primary' className='bg-[#104631]' onClick={() => handleResumeShipment()} />
    </div>
  );
}

export default ShipmentHeaderAction;
