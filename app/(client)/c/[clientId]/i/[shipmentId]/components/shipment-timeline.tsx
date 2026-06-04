import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {CheckCircle2, Circle} from 'lucide-react';
interface IPoint {
  name: string;
  isCurrent: boolean;
}
interface ShipmentTimelineProps {
  allPointName: IPoint[];
  lastPoint: string;
  nextPoint: string;
}
export default function ShipmentTimeline({allPointName, lastPoint, nextPoint}: ShipmentTimelineProps) {
  const CurrentIndex =
    allPointName.findIndex(val => {
      return val.isCurrent;
    }) || 0;
  const currentPoint = allPointName[CurrentIndex] || null;
  const totalPoints = allPointName.length;

  const getPointStateText = (isCurrent: boolean, isDone: boolean, isNext: boolean, isLast: boolean) => {
    if (isCurrent) return 'النقطة الحالية';
    if (isDone) return 'تم الانتهاء';
    if (isNext) return 'النقطة التالية';
    if (isLast) return 'المرحلة الأخيرة';
    return 'قيد الانتظار';
  };

  const getPointDescription = (isCurrent: boolean, isDone: boolean, isNext: boolean, isLast: boolean) => {
    if (isCurrent) return 'الشحنة الآن في هذه المرحلة وأحدث التحديثات متاحة هنا.';
    if (isDone) return 'تم إنجاز هذه المرحلة بنجاح ويمكن متابعة المرحلة التالية.';
    if (isNext) return 'المرحلة التالية قيد التحضير وسيتم البدء بها فور انتهاء المرحلة الحالية.';
    if (isLast) return 'هذه هي المرحلة الأخيرة في رحلة الشحنة.';
    return 'هذه المرحلة ستبدأ بعد اكتمال المراحل السابقة.';
  };

  return (
    <Card className='border-slate-200 bg-white shadow-lg'>
      <CardHeader className='border-b border-slate-100 bg-slate-50'>
        <CardTitle className='text-slate-900'>مخطط التتبع</CardTitle>
        <p className='mt-2 text-sm text-slate-600'>{currentPoint ? `المحطة الحالية: ${currentPoint.name} · المحطة التالية: ${nextPoint || 'غير محددة'} · آخر محطة: ${lastPoint}` : `النقاط: ${totalPoints} · المحطة التالية: ${nextPoint || 'غير محددة'} · آخر محطة: ${lastPoint}`}</p>
      </CardHeader>
      <CardContent className='space-y-4 p-6'>
        {allPointName.map((point, index) => {
          const isCurrent = CurrentIndex == index;
          const isDone = index < CurrentIndex;
          const isLast = point.name == lastPoint;
          const isNext = point.name == nextPoint;
          return (
            <div key={point.name} className='flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md'>
              <div className='flex flex-col items-center gap-2'>
                <span className={`flex h-11 w-11 items-center justify-center rounded-full border-2 ${isDone ? 'border-green-500 bg-green-50 text-green-600' : isCurrent ? 'border-green-600 bg-green-50 text-green-600 animate-heartbeat ring-4 ring-green-200 shadow-lg shadow-green-200/50' : 'border-slate-300 bg-slate-50 text-slate-400'}`}>{isDone ? <CheckCircle2 className='h-5 w-5' /> : <Circle className='h-5 w-5' />}</span>
                {!isLast && <span className={`h-8 w-px ${isDone || isCurrent ? 'bg-green-300' : 'bg-slate-200'}`} />}
              </div>
              <div className='flex-1'>
                <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                  <p className={`font-semibold ${isDone ? 'text-green-800' : isCurrent ? 'text-green-800 font-bold' : 'text-slate-700'}`}>{point.name}</p>
                  <span className='text-sm text-slate-500'>{getPointStateText(isCurrent, isDone, isNext, isLast)}</span>
                </div>
                <p className='mt-2 text-sm leading-6 text-slate-600'>{getPointDescription(isCurrent, isDone, isNext, isLast)}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
