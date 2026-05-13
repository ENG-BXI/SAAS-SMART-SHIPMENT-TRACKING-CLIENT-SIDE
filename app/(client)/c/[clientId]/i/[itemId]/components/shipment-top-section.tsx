import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Truck} from 'lucide-react';
import {shipment} from './shipment-data';

export default function ShipmentTopSection() {
  return (
    <Card className='overflow-hidden border border-slate-200 shadow-lg shadow-slate-200/20'>
      <div className='bg-gradient-to-r from-green-900 via-green-800 to-green-900 px-6 py-7 text-white'>
        <div className='flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between'>
          <div className='space-y-2'>
            <p className='text-sm text-green-200'>رقم الشحنة</p>
            <h1 className='text-3xl font-semibold tracking-tight text-green-100'>{shipment.shipmentNumber}</h1>
            <p className='max-w-2xl text-sm text-green-100'>مسار الشحنة الحالي من الرياض إلى الدمام مع تحديثات وافية لتقدم الطلب والوقت المتوقع.</p>
          </div>

          <div className='flex flex-wrap items-center gap-3'>
            <Badge variant='secondary' className='rounded-full px-4 py-2 text-sm bg-green-600 text-white border-green-500'>
              {shipment.status}
            </Badge>
            <Button variant='outline' className='rounded-full border-green-400 px-4 py-2 text-sm text-green-400 hover:bg-green-400 hover:text-green-900'>
              عرض الحالة
            </Button>
          </div>
        </div>
      </div>

      <CardContent className='grid gap-4 bg-slate-50 px-6 py-6 sm:grid-cols-2'>
        <div className='rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200'>
          <p className='text-sm text-slate-500'>من</p>
          <p className='mt-2 text-lg font-semibold text-slate-950'>{shipment.route.from}</p>
        </div>
        <div className='rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200'>
          <p className='text-sm text-slate-500'>إلى</p>
          <p className='mt-2 text-lg font-semibold text-slate-950'>{shipment.route.to}</p>
        </div>
        <div className='rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200'>
          <p className='text-sm text-slate-500'>الوصول المتوقع</p>
          <p className='mt-2 text-lg font-semibold text-slate-950'>{shipment.route.eta}</p>
        </div>
        <div className='rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200'>
          <div className='flex items-center gap-3'>
            <Truck className='h-5 w-5 text-green-600' />
            <div>
              <p className='text-sm text-slate-500'>عدد محطات التوقف</p>
              <p className='mt-1 text-lg font-semibold text-slate-950'>{shipment.way.points.length}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
