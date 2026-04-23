'use client';
import CustomInput from '@/components/custom-input';
import CustomSelect from '@/components/custom-select';
import PageDashboardHeader from '@/components/dashboard/header';
import {Badge} from '@/components/ui/badge';
import {IconArrowNarrowLeft} from '@tabler/icons-react';
import {useState} from 'react';

const Page = () => {
  const [userName, setUserName] = useState('محمد صالح');
  const [email, setEmail] = useState('mohamed@gmail.com');
  const [password, setPassword] = useState('');

  return (
    <div>
      <PageDashboardHeader title='الاعدادات' description='إدارة إعدادات الحساب، بما يشمل تغيير اللغة، تحديث البيانات الأساسية، ومراجعة معلومات الاشتراك المرتبطة بالنظام.' breadcrumbList={[{text: 'الاعدادات', path: '/manager/settings'}]} />
      <div className='p-3 w-200'>
        <PageDashboardHeader title='اعدادات النظام' titleClassName='font-semibold text-lg' description='اختيار لغة واجهة النظام حسب تفضيلك. سيتم تطبيق التغيير على جميع صفحات النظام.' />
        <div className='flex items-center justify-between my-4'>
          <h4 className='text-nowrap'>لغة النظام</h4>
          <CustomSelect
            className='w-130'
            value='ar'
            options={[
              {value: 'ar', label: 'العربية'},
              {value: 'en', label: 'الإنجليزية'}
            ]}
            placeHolder='لغة النظام'
          />
        </div>
        <PageDashboardHeader title='اعدادات الحساب الشخصي' titleClassName='font-semibold text-lg' description='تحديث المعلومات الأساسية المرتبطة بحسابك الشخصي.تحديث المعلومات الأساسية المرتبطة بحسابك الشخصي.' />
        {/* User Name */}
        <div className='flex items-center justify-between my-4'>
          <h4 className='text-nowrap'>اسم المستخدم</h4>
          <CustomInput className='max-w-130' type='state' value={userName} setValue={setUserName} placeHolder='اسم المستخدم' />
        </div>
        {/* Email */}
        <div className='flex items-center justify-between my-4'>
          <h4 className='text-nowrap'>الايميل</h4>
          <CustomInput className='max-w-130' type='state' value={email} setValue={setEmail} placeHolder='الايميل' />
        </div>
        {/* Password */}
        <div className='flex items-center justify-between my-4'>
          <h4 className='text-nowrap'>كلمة المرور</h4>
          <CustomInput className='max-w-130' type='state' value={password} setValue={setPassword} placeHolder='كلمة المرور' />
        </div>
        <PageDashboardHeader title='حالة الاشتراك' titleClassName='font-semibold text-lg' description='عرض معلومات الاشتراك الحالية وحدود الاستخدام المرتبطة بالخطة.' />
        <div className='flex items-start justify-between my-4'>
          <h4 className='text-nowrap'>حالة الاشتراك</h4>
          <div className='w-130 flex flex-col gap-y-1'>
            <Badge variant='outline' className='border-[#067647] text-md text-[#085D3A] rounded-sm'>
              نشط
            </Badge>
            <p className='text-muted-foreground'>الاشتراك نشط ويمكن استخدام النظام بشكل كامل.</p>
          </div>
        </div>
        <div className='flex items-start justify-between my-4'>
          <h4 className='text-nowrap'>فترة الاشتراك</h4>
          <div className='w-130 flex flex-col gap-y-3'>
            <Badge variant='outline' className='border-[#067647] text-md text-[#085D3A] rounded-sm'>
              المدة المتبقية: 18 يوم
            </Badge>
            <div className='flex items-center gap-x-2'>
              <Badge variant='outline' className='border-[#93370D] text-md text-[#93370D] rounded-sm'>
                بداية الاشتراك: 1 مارس 2026
              </Badge>
              <IconArrowNarrowLeft className='text-[#93370D]' />
              <Badge variant='outline' className='border-[#93370D] text-md text-[#93370D] rounded-sm'>
                نهاية الاشتراك: 1 مارس 2026
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
