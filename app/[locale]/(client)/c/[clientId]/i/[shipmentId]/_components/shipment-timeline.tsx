import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {CheckCircle2, Circle, MapPinned} from 'lucide-react';
import {useTranslations} from 'next-intl';

export interface IPoint {
  name: string;
  isCurrent: boolean;
}

interface ShipmentTimelineProps {
  points: IPoint[];
  nextPointName?: string | null;
}

export default function ShipmentTimeline({points, nextPointName}: ShipmentTimelineProps) {
  const currentIndex = points.findIndex(point => point.isCurrent);
  const t = useTranslations('shipmentClientPage.timeline');

  return (
    <Card className='border-slate-200 bg-white shadow-lg'>
      <CardHeader className='border-b border-slate-100 bg-slate-50'>
        <CardTitle className='text-slate-900'>{t('title')}</CardTitle>
        <p className='text-sm text-slate-500'>{t('description')}</p>
      </CardHeader>
      <CardContent className='space-y-4 p-6'>
        {points.map((point, index) => {
          const isDone = currentIndex !== -1 && index < currentIndex;
          const isCurrent = point.isCurrent;

          return (
            <div key={`${point.name}-${index}`} className='flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md'>
              <div className='flex flex-col items-center gap-2'>
                <span className={`flex h-11 w-11 items-center justify-center rounded-full border-2 ${isDone || isCurrent ? 'border-[#1B8354] bg-[#F3FCF6] text-[#1B8354]' : 'border-slate-300 bg-slate-50 text-slate-400'} ${isCurrent ? 'ring-4 ring-[#1B8354]/15' : ''}`}>{isDone ? <CheckCircle2 className='h-5 w-5' /> : isCurrent ? <MapPinned className='h-5 w-5' /> : <Circle className='h-5 w-5' />}</span>
                {index < points.length - 1 && <span className={`h-8 w-px ${isDone || isCurrent ? 'bg-[#1B8354]/30' : 'bg-slate-200'}`} />}
              </div>

              <div className='flex-1'>
                <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                  <p className={`font-semibold ${isDone || isCurrent ? 'text-slate-950' : 'text-slate-700'}`}>{point.name}</p>
                  <span className='text-sm text-slate-500'>{stepLabel(t, isDone, isCurrent)}</span>
                </div>
                <p className='mt-2 text-sm leading-6 text-slate-600'>{pointDescription(t, isDone, isCurrent, nextPointName)}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function stepLabel(t: (key: string, values?: Record<string, string | number>) => string, isDone: boolean, isCurrent: boolean) {
  if (isCurrent) return t('current');
  if (isDone) return t('done');
  return t('upcoming');
}

function pointDescription(t: (key: string, values?: Record<string, string | number>) => string, isDone: boolean, isCurrent: boolean, nextPointName?: string | null) {
  if (isCurrent) {
    return nextPointName ? t('currentDescriptionWithNext', {nextPointName}) : t('currentDescriptionLast');
  }
  if (isDone) return t('doneDescription');
  return t('upcomingDescription');
}
