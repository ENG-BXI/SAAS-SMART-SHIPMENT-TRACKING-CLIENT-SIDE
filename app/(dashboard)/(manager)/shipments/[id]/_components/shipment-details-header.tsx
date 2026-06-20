import {Badge} from '@/components/ui/badge';
import ShipmentHeaderAction from './shipment-header-action';
import GetShipmentById from '../_services/get-shipment-by-id';
import {cookies} from 'next/headers';
import {cn} from '@/lib/utils';
import { SHIPMENT_STATUS, TShipmentStatus } from '@/lib/Constant/enum';
interface ShipmentDetailsHeaderProps {
  id: string;
}
async function ShipmentDetailsHeader({id}: ShipmentDetailsHeaderProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const data = await GetShipmentById(id, token);
  const status:TShipmentStatus = data?.isCompleted ? SHIPMENT_STATUS.COMPLETED : data?.isPaused ? SHIPMENT_STATUS.PAUSED : SHIPMENT_STATUS.CURRENT;

  return (
    <div className='flex gap-3 flex-col sm:flex-row justify-between sm:items-center mt-5'>
      <div className='flex items-center gap-2'>
        <h2 className='text-xl font-semibold'>شحنة رقم {data?.shipmentNumber}</h2>
        <Badge variant='outline' className={cn(' rounded-sm', status === SHIPMENT_STATUS.COMPLETED && 'border-[#067647] text-[#085D3A]', status === SHIPMENT_STATUS.PAUSED && 'border-red-500 text-red-500', status === SHIPMENT_STATUS.CURRENT && 'border-[#067647] text-[#085D3A]')}>
          شحنة {status}
        </Badge>
      </div>
      <ShipmentHeaderAction id={id} status={status}/>
    </div>
  );
}

export default ShipmentDetailsHeader;
