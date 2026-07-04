import {Skeleton} from '@/components/ui/skeleton';

function HeaderSkeleton({showBreadcrumb = false}: {showBreadcrumb?: boolean}) {
  return (
    <header className='mb-4'>
      {showBreadcrumb && (
        <div className='mb-1'>
          <Skeleton className='h-4 w-24' />
        </div>
      )}
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-8 w-44' />
          <Skeleton className='h-4 w-120 max-w-full' />
        </div>
      </div>
    </header>
  );
}

function CardStatSkeleton() {
  return (
    <div className='border rounded-lg flex-1 min-w-80 p-4'>
      <Skeleton className='h-9 w-9 rounded-full' />
      <Skeleton className='h-4 w-32 mt-3' />
      <Skeleton className='h-4 w-10 mt-2' />
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <tr className='border-b'>
      {Array.from({length: 5}).map((_, i) => (
        <td key={i} className='py-3 px-4'>
          <Skeleton className='h-4 w-full max-w-30' />
        </td>
      ))}
    </tr>
  );
}

const Loading = () => {
  return (
    <div>
      <HeaderSkeleton showBreadcrumb />

      <div className='flex flex-wrap gap-4 mb-5'>
        {Array.from({length: 5}).map((_, i) => (
          <CardStatSkeleton key={i} />
        ))}
      </div>

      <HeaderSkeleton />

      <div className='rounded-md border overflow-hidden'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b bg-muted/40'>
              {['رقم الشحنة', 'تاريخ الانطلاق', 'المسار', 'النقطة الحالية', 'سائق الشحنة'].map((col) => (
                <th key={col} className='py-3 px-4 text-start'>
                  <Skeleton className='h-4 w-24' />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({length: 6}).map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex items-center justify-between mt-4'>
        <Skeleton className='h-4 w-32' />
        <div className='flex gap-1'>
          {Array.from({length: 5}).map((_, i) => (
            <Skeleton key={i} className='h-8 w-8 rounded-md' />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
