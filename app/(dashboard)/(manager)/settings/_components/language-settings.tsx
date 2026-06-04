'use client';
import CustomSelect from '@/components/custom-select';

export function LanguageSettings() {
  return (
    <div className='flex items-center justify-between my-4'>
      <h4 className='text-nowrap'>لغة النظام</h4>
      <CustomSelect
        className='w-130'
        value='ar'
        options={[
          {value: 'ar', label: 'العربية'}
          // {value: 'en', label: 'الإنجليزية'}
        ]}
        placeHolder='لغة النظام'
      />
    </div>
  );
}
