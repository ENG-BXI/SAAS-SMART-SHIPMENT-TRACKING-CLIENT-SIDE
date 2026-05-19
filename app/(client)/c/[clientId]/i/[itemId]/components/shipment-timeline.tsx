import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {CheckCircle2, Circle} from 'lucide-react';
import {shipment} from './shipment-data';

export default function ShipmentTimeline() {
  return (
    <Card className='border-slate-200 bg-white shadow-lg'>
      <CardHeader className='border-b border-slate-100 bg-slate-50'>
        <CardTitle className='text-slate-900'>مخطط التتبع</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4 p-6'>
        {shipment.timeline.map((event, index) => {
          const isDone = event.status === 'done';
          const isCurrent = event.status === 'current';
          return (
            <div key={event.title} className='flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md'>
              <div className='flex flex-col items-center gap-2'>
                <span className={`flex h-11 w-11 items-center justify-center rounded-full border-2 ${isDone ? 'border-green-500 bg-green-50 text-green-600' : isCurrent ? 'border-green-600 bg-green-50 text-green-600 animate-heartbeat ring-4 ring-green-200 shadow-lg shadow-green-200/50' : 'border-slate-300 bg-slate-50 text-slate-400'}`}>{isDone ? <CheckCircle2 className='h-5 w-5' /> : <Circle className='h-5 w-5' />}</span>
                {index < shipment.timeline.length - 1 && <span className={`h-8 w-px ${isDone ? 'bg-green-300' : isCurrent ? 'bg-green-300' : 'bg-slate-200'}`} />}
              </div>
              <div className='flex-1'>
                <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                  <p className={`font-semibold ${isDone ? 'text-green-800' : isCurrent ? 'text-green-800 font-bold' : 'text-slate-700'}`}>{event.title}</p>
                  <span className='text-sm text-slate-500'>{event.time}</span>
                </div>
                <p className='mt-2 text-sm leading-6 text-slate-600'>{event.description}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
