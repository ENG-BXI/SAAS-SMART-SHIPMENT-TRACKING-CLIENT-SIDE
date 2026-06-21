import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {MapPin} from 'lucide-react';
import {IContactWay, IPoint} from '../_services/get-shipment-details-for-client';
import { SHIPMENT_NAME, SHIPMENT_NUMBER } from '@/lib/Constant/enum';
import {useTranslations} from 'next-intl';
interface ShipmentSidebarProps {
  shipmentStatus: SHIPMENT_NUMBER;
  allPointName: IPoint[];
  clientNameAndContactWay: {name: string; contactWays: IContactWay[]};
}
export default function ShipmentSidebar({allPointName,clientNameAndContactWay,shipmentStatus}:ShipmentSidebarProps) {
  const t = useTranslations('shipmentClientPage.sidebar');
  return (
    <div className='space-y-6'>
      <Card className='rounded-2xl border border-slate-200 bg-gradient-to-b from-green-50 to-white p-5 shadow-lg shadow-green-100/40'>
        <CardHeader className='pb-0'>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-slate-200'>
            <div className='flex items-center justify-between gap-4'>
              <div>
                <p className='text-sm text-slate-500'>{t('currentStatus')}</p>
                <p className='mt-2 text-2xl font-semibold text-slate-950'>{SHIPMENT_NAME[shipmentStatus]}</p>
              </div>
            </div>
          </div>

          <div className='rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-slate-200'>
            <div className='flex items-center justify-between gap-3'>
              <p className='text-sm text-slate-500'>{t('mainPoints')}</p>
              <span className='text-lg font-semibold text-slate-950'>{t('stopPointsCount', {count: allPointName.length})}</span>
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
                <p className='text-sm text-slate-500'>{t('contacts')}</p>
                <p className='mt-1 text-lg font-semibold text-slate-950'>{clientNameAndContactWay.name}</p>
              </div>
              <MapPin className='h-5 w-5 text-green-600' />
            </div>
            <div className='mt-4 space-y-3'>
              {clientNameAndContactWay.contactWays.map(contact => (
                <div key={contact.text} className='flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-500'>
                  <div>
                    <p>{contact.contactType === 'email' ? t('email') : t('phone')}</p>
                    <p className='mt-1 font-semibold text-slate-950'>{contact.text}</p>
                  </div>
                  <Badge variant='outline'>{contact.isPrimary ? t('primary') : t('secondary')}</Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
