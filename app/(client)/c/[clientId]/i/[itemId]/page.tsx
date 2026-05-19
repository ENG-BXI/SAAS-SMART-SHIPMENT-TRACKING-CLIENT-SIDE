import ShipmentTopSection from './components/shipment-top-section';
import ShipmentSummaryGrid from './components/shipment-summary-grid';
import ShipmentTimeline from './components/shipment-timeline';
import ShipmentSidebar from './components/shipment-sidebar';
import ShipmentOrderDetails from './components/shipment-order-details';

const Page = () => {
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

        <ShipmentTopSection />

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
