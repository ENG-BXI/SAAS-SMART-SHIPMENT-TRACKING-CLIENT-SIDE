import {Skeleton} from '@/components/ui/skeleton';
import {CurrentShipmentTableSkeleton, FinishedShipmentTableSkeleton} from './_components/skeletons';

export default function Loading() {
  return (
    <div>
      <header className='mb-4'>
        <div className='mb-1'>
          <Skeleton className='h-4 w-24' />
        </div>
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <Skeleton className='h-8 w-44' />
            <Skeleton className='h-4 w-120 max-w-full' />
          </div>
        </div>
      </header>

      <div className='flex items-center justify-between mb-4 gap-4'>
        <Skeleton className='h-10 w-64' />
        <div className='flex gap-2'>
          <Skeleton className='h-10 w-20' />
          <Skeleton className='h-10 w-36' />
        </div>
      </div>

      <CurrentShipmentTableSkeleton />

      <div className='mt-8'>
        <header className='mb-4'>
          <div className='space-y-2'>
            <Skeleton className='h-8 w-44' />
            <Skeleton className='h-4 w-120 max-w-full' />
          </div>
        </header>

        <div className='flex items-center justify-between mb-4 gap-4'>
          <Skeleton className='h-10 w-64' />
          <Skeleton className='h-10 w-20' />
        </div>

        <FinishedShipmentTableSkeleton />
      </div>
    </div>
  );
}
