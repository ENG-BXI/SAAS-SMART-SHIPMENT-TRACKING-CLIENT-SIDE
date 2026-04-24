import React from 'react';
import {Skeleton} from '../ui/skeleton';

const SideBarSkeleton = () => {
  return (
    <div className='flex flex-col gap-y-1.5'>
      {Array.from({length: 5}).map((_, index) => (
        <Skeleton key={index} className='h-8 rounded-lg w-full bg-gray-200' />
      ))}
    </div>
  );
};

export default SideBarSkeleton;
