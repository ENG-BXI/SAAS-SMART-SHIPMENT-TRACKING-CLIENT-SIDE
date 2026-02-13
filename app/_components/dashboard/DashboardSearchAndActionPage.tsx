import React from 'react';
import CustomInput from '../CustomInput';
import {IDashboardSearchAndActionPage} from '@/app/_Types/IDashboardSearchAndActionPage';

function DashboardSearchAndActionPage({value, setValue,action}: IDashboardSearchAndActionPage) {
  return (
    <div className='flex justify-between gap-x-3 mb-3'>
      <CustomInput value={value} setValue={setValue} className='max-w-100' />
    {action}
    </div>
  );
}

export default DashboardSearchAndActionPage;
