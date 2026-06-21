'use client';
import CustomInput from '@/components/custom-input';
import {useMe} from '@/services/me';
import {useEffect, useState} from 'react';

function UserSection() {
  const {data, isLoading, isError, error} = useMe();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('***********');
  useEffect(() => {
    if (data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserName(data.name);
      setEmail(data.email);
    }
  }, [data]);
  if (isError) throw new Error(error.message);
  return (
    <>
      {/* User Name */}
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center justify-between my-4'>
        <h4 className='text-nowrap'>اسم المستخدم</h4>
        <CustomInput className='max-w-130' type='state' value={userName} setValue={setUserName} placeHolder={isLoading ? 'جاري التحميل' : 'اسم المستخدم'} />
      </div>
      {/* Email */}
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center justify-between my-4'>
        <h4 className='text-nowrap'>الايميل</h4>
        <CustomInput className='max-w-130' type='state' value={email} setValue={setEmail} placeHolder={isLoading ? 'جاري التحميل' : 'الايميل'} />
      </div>
      {/* Password */}
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center justify-between my-4'>
        <h4 className='text-nowrap'>كلمة المرور</h4>
        <CustomInput className='max-w-130' type='state' value={password} setValue={setPassword} placeHolder='كلمة المرور' />
      </div>
    </>
  );
}

export default UserSection;
