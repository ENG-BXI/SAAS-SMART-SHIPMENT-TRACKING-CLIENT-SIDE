'use client';
import {useState} from 'react';
import CustomInput from '../custom-input';
import {IDashboardSearchAndActionPage} from '@/Interfaces/dashboard-search-and-action-page';
import {cn} from '@/lib/utils';
import {useSearchParams} from '@/hooks/use-search';

function DashboardSearchAndActionPage({action, className}: IDashboardSearchAndActionPage) {
  const [search, setSearch] = useState('');
  
  useSearchParams({key: 'search', search});
  return (
    <div className={cn(`flex justify-between gap-x-3 mb-3`, className)}>
      <CustomInput type='state' value={search} setValue={setSearch} className='max-w-100' />
      {action}
    </div>
  );
}

export default DashboardSearchAndActionPage;
