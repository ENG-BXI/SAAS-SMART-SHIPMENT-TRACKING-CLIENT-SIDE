import {Skeleton} from '@/components/ui/skeleton';

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

      <div className='p-3 w-200 space-y-8'>
        <div>
          <div className='space-y-2 mb-4'>
            <Skeleton className='h-6 w-36' />
            <Skeleton className='h-4 w-96 max-w-full' />
          </div>
          <div className='flex items-center justify-between py-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-10 w-130' />
          </div>
        </div>

        <div>
          <div className='space-y-2 mb-4'>
            <Skeleton className='h-6 w-44' />
            <Skeleton className='h-4 w-120 max-w-full' />
          </div>
          <div className='space-y-4'>
            <div className='flex items-center justify-between py-2'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-10 w-130' />
            </div>
            <div className='flex items-center justify-between py-2'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-10 w-130' />
            </div>
            <div className='flex items-center justify-between py-2'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-10 w-130' />
            </div>
          </div>
        </div>

        <div>
          <div className='space-y-2 mb-4'>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-4 w-96 max-w-full' />
          </div>
          <div className='space-y-4'>
            <div className='flex items-start justify-between py-2'>
              <Skeleton className='h-4 w-24' />
              <div className='w-130 space-y-2'>
                <Skeleton className='h-6 w-16' />
                <Skeleton className='h-4 w-full' />
              </div>
            </div>
            <div className='flex items-start justify-between py-2'>
              <Skeleton className='h-4 w-24' />
              <div className='w-130 space-y-3'>
                <Skeleton className='h-6 w-36' />
                <div className='flex gap-2'>
                  <Skeleton className='h-6 w-44' />
                  <Skeleton className='h-6 w-44' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
