import React from 'react';
import CustomInput from '../custom-input';
import {IDashboardSearchAndActionPage} from '@/Interfaces/dashboard-search-and-action-page';
import { cn } from '@/lib/utils';

function DashboardSearchAndActionPage({value, setValue, action,className}: IDashboardSearchAndActionPage) {
  return (
    <div className={cn(`flex justify-between gap-x-3 mb-3`,className)}>
      <CustomInput type='state' value={value} setValue={setValue} className='max-w-100' />
      {action}
    </div>
  );
}

export default DashboardSearchAndActionPage;
