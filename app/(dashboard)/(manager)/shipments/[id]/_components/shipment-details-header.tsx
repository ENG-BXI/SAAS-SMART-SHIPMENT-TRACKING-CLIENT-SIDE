import CustomButton from "@/components/custom-button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

function ShipmentDetailsHeader() {
  return (
    <div className='flex justify-between items-center mt-5'>
      <div className='flex items-center gap-2'>
        <h2 className='text-xl font-semibold'>شحنة رقم 1101506</h2>
        <Badge variant='outline' className='border-[#067647] text-[#085D3A] rounded-sm'>
          شحنة حالية
        </Badge>
      </div>
      <div className='flex gap-2'>
        <CustomButton text='تحريك' icon={<ArrowRight />} type='primary' />
        <CustomButton text='تحريك بدون اشعار' type='primary' className='bg-[#104631]' />
        <CustomButton text='توقيف' type='danger' />
      </div>
    </div>
  );
}

export default ShipmentDetailsHeader;
