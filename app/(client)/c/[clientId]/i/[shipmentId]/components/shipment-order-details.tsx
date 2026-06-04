import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import { IconArrowLeft } from '@tabler/icons-react';
interface IShipmentItem {
  name: string;
  quantity: number;
  isBreakable: boolean;
}
interface ShipmentOrderDetailsProps {
  firstPoint: string;
  lastPoint: string;
  driverInfo: {
    userName: string;
    phoneNumber: string;
    email: string;
  };
  shipmentItem: IShipmentItem[];
  currentPointName: string;
  nextPointName: string;
  shipmentNumber: string;
  companyName: string;
}

export default function ShipmentOrderDetails({companyName,currentPointName,driverInfo,firstPoint,lastPoint,nextPointName,shipmentItem,shipmentNumber,}: ShipmentOrderDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تفاصيل الطلب</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-6 lg:grid-cols-2'>
        <div className='rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm'>
          <div className='flex items-center justify-between gap-2 text-sm text-slate-500'>
            <span>المنطلق</span>
            <span className='font-semibold text-slate-950'>{firstPoint}</span>
          </div>
          <div className='mt-4 flex items-center justify-between gap-2 text-sm text-slate-500'>
            <span>الوصول</span>
            <span className='font-semibold text-slate-950'>{lastPoint}</span>
          </div>
          <div className='mt-4 flex items-center justify-between gap-2 text-sm text-slate-500'>
            <span>السائق</span>
            <span className='font-semibold text-slate-950'>{driverInfo.userName}</span>
          </div>
          <div className='mt-4 flex items-center justify-between gap-2 text-sm text-slate-500'>
            <span>الهاتف</span>
            <span className='font-semibold text-slate-950'>{driverInfo.phoneNumber}</span>
          </div>
          <div className='mt-4 flex items-center justify-between gap-2 text-sm text-slate-500'>
            <span>البريد الإلكتروني</span>
            <span className='font-semibold text-slate-950'>{driverInfo.email || 'غير متوفر'}</span>
          </div>
        </div>

        <div className='grid gap-4'>
          <div className='rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm'>
            <div className='flex items-center justify-between gap-2 text-sm text-slate-500'>
              <span>عدد الأصناف</span>
              <span className='font-semibold text-slate-950'>{shipmentItem.length}</span>
            </div>
            <div className='mt-4 flex items-center justify-between gap-2 text-sm text-slate-500'>
              <span>النقطة الحالية</span>
              <span className='font-semibold text-slate-950'>{currentPointName}</span>
            </div>
            <div className='mt-4 flex items-center justify-between gap-2 text-sm text-slate-500'>
              <span>النقطة التالية</span>
              <span className='font-semibold text-slate-950'>{nextPointName}</span>
            </div>
          </div>
          <div className='rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm'>
            <p className='text-sm text-slate-500'>تفاصيل المسار</p>
            <div className='mt-4 space-y-3 rounded-3xl bg-slate-50 p-4 text-sm text-slate-500'>
              <div className='flex items-center justify-between'>
                <span>المسار</span>
                <span className='font-semibold flex text-slate-950'>{`${firstPoint}`} <IconArrowLeft/> {`${lastPoint}`}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>رقم الشحنة</span>
                <span className='font-semibold text-slate-950'>{shipmentNumber}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>الشركة</span>
                <span className='font-semibold text-slate-950'>{companyName}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
