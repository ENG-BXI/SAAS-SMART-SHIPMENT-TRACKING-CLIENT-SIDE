import ShipmentTopSection from './_components/shipment-top-section';
import ShipmentSummaryGrid from './_components/shipment-summary-grid';
import ShipmentTimeline from './_components/shipment-timeline';
import ShipmentSidebar from './_components/shipment-sidebar';
import ShipmentOrderDetails from './_components/shipment-order-details';
import {GetShipmentDetailsForClient} from './_services/get-shipment-details-for-client';
import {cookies} from 'next/headers';
import ClientDetailsRealTime from './_components/client-details-real-time';
import {getTranslations} from 'next-intl/server';
import {BasicMapExample} from './_components/map-mapcn';
interface PageProps {
  params: Promise<{clientId: string; shipmentId: string}>;
}
const Page = async ({params}: PageProps) => {
  const {clientId, shipmentId} = await params;
  const t = await getTranslations('shipmentClientPage');
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const data = await GetShipmentDetailsForClient(clientId, shipmentId, token);
  const currentPoint = data.allPointName.filter(point => {
    return point.isCurrent;
  })[0].name;
  return (
    <div className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <ClientDetailsRealTime />
      <div className='space-y-8'>
        <header className='space-y-3'>
          <p className='text-sm font-semibold uppercase tracking-[0.22em] text-green-700'>{t('eyebrow')}</p>
          <div className='space-y-2'>
            <h2 className='text-3xl font-semibold text-slate-950'>{t('title')}</h2>
            <p className='max-w-3xl text-sm leading-6 text-slate-500'>{t('description')}</p>
          </div>
        </header>
        <ShipmentTopSection firstPoint={data.firstPoint} lastPoint={data.lastPoint} numberOfPoint={data.allPointName.length} shipmentNumber={data.shipmentNumber} status={data.shipmentStatus} />
        <div className='grid gap-6 xl:grid-cols-[1.6fr_0.95fr]'>
          <ShipmentSummaryGrid companyName={data.companyName} clientNameAndContactWay={data.clientNameAndContactWay} currentPoint={currentPoint} firstPoint={data.firstPoint} lastPoint={data.lastPoint} numberOfShipmentItem={data.shipmentItem.length} progress={data.percentageOfPoint} reminderPoint={data.reminderPoint} />
          <ShipmentSidebar allPointName={data.allPointName} clientNameAndContactWay={data.clientNameAndContactWay} shipmentStatus={data.shipmentStatus} />
        </div>
        <ShipmentTimeline points={data.allPointName} nextPointName={data.nextPoint?.name} />
        <BasicMapExample allPoint={data.allPointName} />
        <ShipmentOrderDetails firstPoint={data.firstPoint} lastPoint={data.lastPoint} currentPointName={data.allPointName.find(p => p.isCurrent)?.name ?? data.lastPoint} companyName={data.companyName} wayPointsLength={data.wayPointsLength} reminderPoint={data.reminderPoint} shipmentItems={data.shipmentItem} driverInfo={{userName: data.driverInfo.userName, phoneNumber: data.driverInfo.phoneNumber}} />
      </div>
    </div>
  );
};

export default Page;
