import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export interface IShipmenItem {
  name: string;
  quantity: number;
  isBreakable: boolean;
}

interface ShipmentOrderDetailsProps {
  firstPoint: string;
  lastPoint: string;
  currentPointName: string;
  companyName: string;
  wayPointsLength: number;
  reminderPoint: number;
  shipmentItems: IShipmenItem[];
  driverInfo: {
    userName: string;
    phoneNumber: string;
  };
}

export default function ShipmentOrderDetails({firstPoint, lastPoint, currentPointName, companyName, wayPointsLength, reminderPoint, shipmentItems, driverInfo}: ShipmentOrderDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تفاصيل الطلب</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-6 lg:grid-cols-2'>
        <div className='rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm'>
          <Row label='المنطلق' value={firstPoint} />
          <Row label='الوصول' value={lastPoint} />
          <Row label='السائق' value={driverInfo.userName || 'غير متوفر'} />
          <Row label='الهاتف' value={driverInfo.phoneNumber || 'غير متوفر'} />
        </div>

        <div className='grid gap-4'>
          <div className='rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm'>
            <Row label='عدد الأغراض' value={`${shipmentItems.length}`} />
            <Row label='النقطة الحالية' value={currentPointName} />
          </div>
          <div className='rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm'>
            <p className='text-sm text-slate-500'>تفاصيل المسار</p>
            <div className='mt-4 space-y-3 rounded-3xl bg-slate-50 p-4 text-sm text-slate-500'>
              <div className='flex items-center justify-between'>
                <span>الشركة الناقلة</span>
                <span className='font-semibold text-slate-950'>{companyName}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>إجمالي المحطات</span>
                <span className='font-semibold text-slate-950'>{wayPointsLength}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>المحطات المتبقية</span>
                <span className='font-semibold text-slate-950'>{reminderPoint}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({label, value}: {label: string; value: string}) {
  return (
    <div className='mt-4 flex items-center justify-between gap-2 text-sm text-slate-500 first:mt-0'>
      <span>{label}</span>
      <span className='font-semibold text-slate-950'>{value}</span>
    </div>
  );
}
