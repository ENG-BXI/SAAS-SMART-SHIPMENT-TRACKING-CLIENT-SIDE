import React from 'react';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';
import {Filter, PlusCircle} from 'lucide-react';
import {IDashboardSearchAndActionPage} from '@/app/_Types/IDashboardSearchAndActionPage';

function DashboardSearchAndActionPage({value, setValue}: IDashboardSearchAndActionPage) {
  return (
    <div className='flex justify-between gap-x-3 mb-3'>
      <CustomInput value={value} setValue={setValue} className='max-w-100' />
      <div className=' flex gap-x-1'>
        <CustomButton text='فلترة' type='secondary' icon={<Filter className='' />} />
        <CustomButton text=' اضافة شركة جديدة' icon={<PlusCircle className='min-w-5 min-h-5' />} />
      </div>
    </div>
  );
}

export default DashboardSearchAndActionPage;
