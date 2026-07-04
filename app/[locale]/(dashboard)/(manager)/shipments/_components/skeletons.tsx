import {Skeleton} from '@/components/ui/skeleton';
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@/components/ui/table';

export function CurrentShipmentTableSkeleton() {
  return (
    <div className='space-y-4'>
      <div className='rounded-md border overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-start'><Skeleton className='h-4 w-16' /></TableHead>
              <TableHead className='text-start'><Skeleton className='h-4 w-24' /></TableHead>
              <TableHead className='text-start'><Skeleton className='h-4 w-20' /></TableHead>
              <TableHead className='text-start'><Skeleton className='h-4 w-24' /></TableHead>
              <TableHead className='text-start'><Skeleton className='h-4 w-24' /></TableHead>
              <TableHead className='text-start'><Skeleton className='h-4 w-16' /></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({length: 5}).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className='h-4 w-16' /></TableCell>
                <TableCell><Skeleton className='h-4 w-24' /></TableCell>
                <TableCell><Skeleton className='h-4 w-20' /></TableCell>
                <TableCell><Skeleton className='h-4 w-24' /></TableCell>
                <TableCell><Skeleton className='h-4 w-24' /></TableCell>
                <TableCell><Skeleton className='h-6 w-16 rounded-full' /></TableCell>
                <TableCell><Skeleton className='h-4 w-8 ms-auto' /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
}

export function FinishedShipmentTableSkeleton() {
  return (
    <div className='space-y-4'>
      <div className='rounded-md border overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-start'><Skeleton className='h-4 w-16' /></TableHead>
              <TableHead className='text-start'><Skeleton className='h-4 w-24' /></TableHead>
              <TableHead className='text-start'><Skeleton className='h-4 w-24' /></TableHead>
              <TableHead className='text-start'><Skeleton className='h-4 w-20' /></TableHead>
              <TableHead className='text-start'><Skeleton className='h-4 w-24' /></TableHead>
              <TableHead className='text-start'><Skeleton className='h-4 w-24' /></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({length: 5}).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className='h-4 w-16' /></TableCell>
                <TableCell><Skeleton className='h-4 w-24' /></TableCell>
                <TableCell><Skeleton className='h-4 w-24' /></TableCell>
                <TableCell><Skeleton className='h-4 w-20' /></TableCell>
                <TableCell><Skeleton className='h-4 w-24' /></TableCell>
                <TableCell><Skeleton className='h-4 w-24' /></TableCell>
                <TableCell><Skeleton className='h-4 w-8 ms-auto' /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
}
