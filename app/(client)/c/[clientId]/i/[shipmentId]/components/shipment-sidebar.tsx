import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {MapPin} from 'lucide-react';
import { contactLabel } from './shipment-data';
interface IContactWays {
  text: string;
  contactType: string;
  isPrimary: boolean;
}
interface IPoint {
  name: string;
  isCurrent: boolean;
}
interface ShipmentSidebarProps {
  status: number;
  wayPointsLength: number;
  contactWays: IContactWays[];
  clientName: string;
  allPointName: IPoint[];
}
export default function ShipmentSidebar({contactWays,allPointName,clientName,status,wayPointsLength}: ShipmentSidebarProps) {
  return (
    <div className='space-y-6'>
      <Card className='rounded-2xl border border-slate-200 bg-linear-to-b from-green-50 to-white p-5 shadow-lg shadow-green-100/40'>
        <CardHeader className='pb-0'>
          <CardTitle>حالة سريعة</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-slate-200'>
            <div className='flex items-center justify-between gap-4'>
              <div>
                <p className='text-sm text-slate-500'>الحالة الحالية</p>
                <p className='mt-2 text-2xl font-semibold text-slate-950'>{status}</p>
              </div>
              <Badge variant='default' className='rounded-full px-4 py-2 text-sm'>
                On track
              </Badge>
            </div>
          </div>

          <div className='rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-slate-200'>
            <div className='flex items-center justify-between gap-3'>
              <p className='text-sm text-slate-500'>النقاط الرئيسية</p>
              <span className='text-lg font-semibold text-slate-950'>{wayPointsLength}</span>
            </div>
            <div className='mt-3 grid gap-2 rounded-3xl bg-slate-50 p-3 text-sm text-slate-500'>
              {allPointName.map(point => (
                <div key={point.name} className='flex items-center gap-2'>
                  <span className='h-2.5 w-2.5 rounded-full bg-green-500' />
                  <span>{point.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-slate-200'>
            <div className='flex items-center justify-between gap-3'>
              <div>
                <p className='text-sm text-slate-500'>جهات الاتصال</p>
                <p className='mt-1 text-lg font-semibold text-slate-950'>{clientName}</p>
              </div>
              <MapPin className='h-5 w-5 text-green-600' />
            </div>
            <div className='mt-4 space-y-3'>
              {contactWays.map(contact => (
                <div key={contact.text} className='flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-500'>
                  <div>
                    <p>{contactLabel(contact.contactType)}</p>
                    <p className='mt-1 font-semibold text-slate-950'>{contact.text}</p>
                  </div>
                  <Badge variant='outline'>{contact.isPrimary ? 'رئيسي' : 'ثانوي'}</Badge>
                </div>
              ))}
            </div>
          </div>

          <Button variant='default' className='w-full rounded-full bg-cyan-600 text-white hover:bg-cyan-700'>
            تتبع مباشر
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
