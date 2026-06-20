import ShipmentTopSection from './_components/shipment-top-section';
import ShipmentSummaryGrid from './_components/shipment-summary-grid';
import ShipmentTimeline from './_components/shipment-timeline';
import ShipmentSidebar from './_components/shipment-sidebar';
import ShipmentOrderDetails from './_components/shipment-order-details';
import {GetShipmentDetailsForClient} from './_services/get-shipment-details-for-client';
import {cookies} from 'next/headers';
import { TShipmentStatus } from '@/lib/Constant/enum';
interface PageProps {
  params: Promise<{clientId: string; shipmentId: string}>;
}
const Page = async ({params}: PageProps) => {
  const {clientId, shipmentId} = await params;
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  console.log('====================================');
  console.log(clientId, shipmentId);
  console.log('====================================');
  const data = await GetShipmentDetailsForClient(clientId, shipmentId, token);
  return (
    <div className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <div className='space-y-8'>
        <header className='space-y-3'>
          <p className='text-sm font-semibold uppercase tracking-[0.22em] text-green-700'>تتبع الشحنة</p>
          <div className='space-y-2'>
            <h2 className='text-3xl font-semibold text-slate-950'>حالة الطلب الحالية ومعلومات التتبع الرسمية</h2>
            <p className='max-w-3xl text-sm leading-6 text-slate-500'>عرض واضح ومنظم للوضع الحالي للشحنة، مسارها، وتفاصيل الاتصال في صفحة واحدة منسقة.</p>
          </div>
        </header>

        <ShipmentTopSection firstPoint={data.firstPoint} lastPoint={data.lastPoint} numberOfPoint={data.allPointName.length} shipmentNumber={data.shipmentNumber} status={data.shipmentStatus} />

        <div className='grid gap-6 xl:grid-cols-[1.6fr_0.95fr]'>
          <ShipmentSummaryGrid />
          <ShipmentSidebar />
        </div>

        <ShipmentTimeline />
        <ShipmentOrderDetails />
      </div>
    </div>
  );
};

export default Page;
