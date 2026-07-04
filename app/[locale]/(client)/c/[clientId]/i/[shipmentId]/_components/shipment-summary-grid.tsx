import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Progress} from '@/components/ui/progress';
import {Clock, MapPin, Package, Truck} from 'lucide-react';
import { IContactWay } from '../_services/get-shipment-details-for-client';
import {useTranslations} from 'next-intl';
interface ShipmentSummaryGridProps {
  companyName: string;
  firstPoint: string;
  lastPoint: string;
  currentPoint: string;
  progress: number;
  reminderPoint: number;
  numberOfShipmentItem: number;
  clientNameAndContactWay: {name: string; contactWays: IContactWay[]};

}
export default function ShipmentSummaryGrid({clientNameAndContactWay,companyName,currentPoint,firstPoint,lastPoint,numberOfShipmentItem,progress,reminderPoint}:ShipmentSummaryGridProps) {
  const t = useTranslations('shipmentClientPage.summaryGrid');
  return (
    <div className='grid gap-6'>
      <Card>
        <CardHeader className='pb-0'>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className='grid gap-4 lg:grid-cols-2'>
          <div className='space-y-4'>
            <div className='rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm'>
              <div className='flex items-center gap-3'>
                <span className='flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700'>
                  <Package className='h-5 w-5' />
                </span>
                <div>
                  <p className='text-sm text-slate-500'>{t('carrier')}</p>
                  <p className='mt-1 text-lg font-semibold text-slate-950'>{companyName}</p>
                </div>
              </div>
              <div className='mt-6 space-y-3 rounded-3xl bg-slate-50 p-4'>
                <div className='flex items-center justify-between text-sm text-slate-500'>
                  <span>{t('from')}</span>
                  <span className='font-semibold text-slate-950'>{firstPoint}</span>
                </div>
                <div className='flex items-center justify-between text-sm text-slate-500'>
                  <span>{t('to')}</span>
                  <span className='font-semibold text-slate-950'>{lastPoint}</span>
                </div>
              </div>
            </div>

            <div className='rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm'>
              <div className='flex items-center justify-between gap-3'>
                <div>
                  <p className='text-sm text-slate-500'>{t('currentPoint')}</p>
                  <p className='mt-1 text-lg font-semibold text-slate-950'>{currentPoint}</p>
                </div>
                <MapPin className='h-5 w-5 text-green-600' />
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm'>
              <div className='flex items-center justify-between gap-3'>
                <div>
                  <p className='text-sm text-slate-500'>{t('progress')}</p>
                  <p className='mt-1 text-2xl font-semibold text-slate-950'>{Math.round(progress)}%</p>
                </div>
                <span className='flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700'>
                  <Clock className='h-5 w-5' />
                </span>
              </div>
              <div className='mt-5'>
                <Progress value={progress} />
              </div>
              <div className='mt-5 grid gap-3 rounded-3xl bg-slate-50 p-4'>
                <div className='flex items-center justify-between text-sm text-slate-500'>
                  <span>{t('remainingPoints')}</span>
                  <span className='font-semibold text-slate-950'>{reminderPoint}</span>
                </div>
                <div className='flex items-center justify-between text-sm text-slate-500'>
                  <span>{t('itemsCount')}</span>
                  <span className='font-semibold text-slate-950'>{numberOfShipmentItem}</span>
                </div>
              </div>
            </div>

            <div className='rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm'>
              <div className='flex items-center justify-between gap-3'>
                <div>
                  <p className='text-sm text-slate-500'>{t('clientInfo')}</p>
                  <p className='mt-1 text-lg font-semibold text-slate-950'>{clientNameAndContactWay.name}</p>
                </div>
                <Truck className='h-5 w-5 text-green-600' />
              </div>
              <div className='mt-6 space-y-3'>
                {clientNameAndContactWay.contactWays.map(contact => (
                  <div key={contact.text} className='flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-500'>
                    <span>{contact.contactType === 'email' ? t('email') : t('phone')}</span>
                    <span className='font-semibold text-slate-950'>{contact.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
