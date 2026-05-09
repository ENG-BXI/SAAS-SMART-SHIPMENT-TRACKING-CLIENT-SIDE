import {cookies} from 'next/headers';
import {formattedDate} from '@/lib/utils';
import GetShipmentById from '../_services/get-shipment-by-id';
import {ShipmentDetailsInfo} from './shipment-details-info';
async function ShipmentInfo({id}: {id: string}) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const data = await GetShipmentById(id, token);
  console.log(data);
  return (
    <div className='grid gap-5 my-5 grid-cols-[2fr_3fr]'>
      <ShipmentDetailsInfo title='تاريخ الانطلاق' value={formattedDate(data.launchDate)} />
      <ShipmentDetailsInfo title='رقم السائق' value={data.driver.phoneNumber || '---'} />
      <ShipmentDetailsInfo title='تاريخ الوصول' value={data.endDate ? formattedDate(data.endDate) : 'لم تصل بعد'} />
      <ShipmentDetailsInfo title='المسار' value={data.way.name} />
      <ShipmentDetailsInfo title='عدد العملاء' value={data.clients} />
      <ShipmentDetailsInfo title='عدد الاغراض' value={'Temp Data'} />
      <ShipmentDetailsInfo title='النقطة الحالية' value={data.currentPoint.name || '---'} />
    </div>
  );
}
export default ShipmentInfo;
