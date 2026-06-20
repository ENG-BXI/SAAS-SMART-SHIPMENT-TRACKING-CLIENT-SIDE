import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {shipment} from './shipment-data';

export default function ShipmentOrderDetails() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تفاصيل الطلب</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-6 lg:grid-cols-2'>
        <div className='rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm'>
          <div className='flex items-center justify-between gap-2 text-sm text-slate-500'>
            <span>المنطلق</span>
            <span className='font-semibold text-slate-950'>{shipment.route.from}</span>
          </div>
          <div className='mt-4 flex items-center justify-between gap-2 text-sm text-slate-500'>
            <span>الوصول</span>
            <span className='font-semibold text-slate-950'>{shipment.route.to}</span>
          </div>
          <div className='mt-4 flex items-center justify-between gap-2 text-sm text-slate-500'>
            <span>السائق</span>
            <span className='font-semibold text-slate-950'>{shipment.driver.userName}</span>
          </div>
          <div className='mt-4 flex items-center justify-between gap-2 text-sm text-slate-500'>
            <span>الهاتف</span>
            <span className='font-semibold text-slate-950'>{shipment.driver.phoneNumber}</span>
          </div>
        </div>

        <div className='grid gap-4'>
          <div className='rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm'>
            <div className='flex items-center justify-between gap-2 text-sm text-slate-500'>
              <span>عدد الأغراض</span>
              <span className='font-semibold text-slate-950'>{shipment.items.length}</span>
            </div>
            <div className='mt-4 flex items-center justify-between gap-2 text-sm text-slate-500'>
              <span>النقطة الحالية</span>
              <span className='font-semibold text-slate-950'>{shipment.currentPoint.name}</span>
            </div>
          </div>
          <div className='rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm'>
            <p className='text-sm text-slate-500'>تفاصيل المسار</p>
            <div className='mt-4 space-y-3 rounded-3xl bg-slate-50 p-4 text-sm text-slate-500'>
              <div className='flex items-center justify-between'>
                <span>المسار</span>
                <span className='font-semibold text-slate-950'>{shipment.way.name}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>تاريخ الإنطلاق</span>
                <span className='font-semibold text-slate-950'>11 مايو 09:30</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>الوجهة</span>
                <span className='font-semibold text-slate-950'>الدمام</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
