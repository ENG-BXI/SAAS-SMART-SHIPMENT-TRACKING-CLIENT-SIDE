import {cookies} from 'next/headers';
import {formattedDate} from '@/lib/utils';
import GetShipmentById from '../_services/get-shipment-by-id';
import {ShipmentDetailsInfo} from './shipment-details-info';
import { getTranslations } from 'next-intl/server';
async function ShipmentInfo({id}: {id: string}) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const data = await GetShipmentById(id, token);
  const t = await getTranslations('shipmentDetails.info');
  return (
    <div className='grid gap-5 my-5 grid-cols-[2fr_3fr]'>
      <ShipmentDetailsInfo title={t('fields.launchDate')} value={formattedDate(data.launchDate)} />
      <ShipmentDetailsInfo title={t('fields.driverPhone')} value={data.driver.phoneNumber || t('values.unknown')} />
      <ShipmentDetailsInfo title={t('fields.endDate')} value={data.endDate ? formattedDate(data.endDate) : t('values.notArrived')} />
      <ShipmentDetailsInfo title={t('fields.route')} value={data.way.name} />
      <ShipmentDetailsInfo title={t('fields.clientsCount')} value={String(data.clients)} />
      <ShipmentDetailsInfo title={t('fields.itemsCount')} value={String(data.shipmentItem)} />
      <ShipmentDetailsInfo title={t('fields.currentPoint')} value={data.currentPoint?.name || t('values.unknown')} />
    </div>
  );
}
export default ShipmentInfo;
