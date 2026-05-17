import React from 'react';
import {Skeleton} from '@/components/ui/skeleton';
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@/components/ui/table';

const Loading = () => {
  return (
    <div className='space-y-6'>
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

      <div className='flex flex-wrap gap-4 mb-5'>
        {Array.from({length: 4}).map((_, i) => (
          <div key={i} className='flex-1 min-w-[200px] p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-3'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-8 w-16' />
          </div>
        ))}
      </div>

      <div className='space-y-4'>
        <div className='rounded-md border overflow-hidden'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='text-start'><Skeleton className='h-4 w-24' /></TableHead>
                <TableHead className='text-start'><Skeleton className='h-4 w-32' /></TableHead>
                <TableHead className='text-start'><Skeleton className='h-4 w-28' /></TableHead>
                <TableHead className='text-start'><Skeleton className='h-4 w-24' /></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({length: 5}).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className='h-4 w-24' /></TableCell>
                  <TableCell><Skeleton className='h-4 w-32' /></TableCell>
                  <TableCell><Skeleton className='h-4 w-28' /></TableCell>
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
    </div>
  );
};

export default Loading;
