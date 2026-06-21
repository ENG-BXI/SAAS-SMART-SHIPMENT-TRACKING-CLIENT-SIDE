import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useTranslations} from 'next-intl';

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
  const t = useTranslations('shipmentClientPage.orderDetails');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-6 lg:grid-cols-2'>
        <div className='rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm'>
          <Row label={t('origin')} value={firstPoint} />
          <Row label={t('arrival')} value={lastPoint} />
          <Row label={t('driver')} value={driverInfo.userName || t('notAvailable')} />
          <Row label={t('phone')} value={driverInfo.phoneNumber || t('notAvailable')} />
        </div>

        <div className='grid gap-4'>
          <div className='rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm'>
            <Row label={t('itemsCount')} value={`${shipmentItems.length}`} />
            <Row label={t('currentPoint')} value={currentPointName} />
          </div>
          <div className='rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm'>
            <p className='text-sm text-slate-500'>{t('routeDetails')}</p>
            <div className='mt-4 space-y-3 rounded-3xl bg-slate-50 p-4 text-sm text-slate-500'>
              <div className='flex items-center justify-between'>
                <span>{t('carrier')}</span>
                <span className='font-semibold text-slate-950'>{companyName}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>{t('totalStations')}</span>
                <span className='font-semibold text-slate-950'>{wayPointsLength}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>{t('remainingStations')}</span>
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
