import {Badge} from '@/components/ui/badge';
import ShipmentHeaderAction from './shipment-header-action';
interface ShipmentDetailsHeaderProps {
  id: string;
}
function ShipmentDetailsHeader({id}: ShipmentDetailsHeaderProps) {
  return (
    <div className='flex justify-between items-center mt-5'>
      <div className='flex items-center gap-2'>
        <h2 className='text-xl font-semibold'>شحنة رقم 1101506</h2>
        {/* // TODO : Add Logic Of Badge Based On Shipment Status */}
        <Badge variant='outline' className='border-[#067647] text-[#085D3A] rounded-sm'>
          شحنة حالية
        </Badge>
      </div>
      <ShipmentHeaderAction id={id} />
    </div>
  );
}

export default ShipmentDetailsHeader;
