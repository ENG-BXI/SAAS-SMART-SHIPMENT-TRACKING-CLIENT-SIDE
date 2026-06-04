'use client';

import CustomInput from '@/components/custom-input';
import {useMe} from '@/services/me';
import {useEffect, useState} from 'react';

export function UserInfo() {
  const {data, isLoading} = useMe();
  const [userName, setUserName] = useState(data?.name || '');
  const [email, setEmail] = useState(data?.email || '');
  const [password, setPassword] = useState('***********');
  useEffect(() => {
    if (data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserName(data.name);
      setEmail(data.email);
    }
  }, [data]);
  return (
    <>
      {/* User Name */}
      <div className='flex items-center justify-between my-4'>
        <h4 className='text-nowrap'>اسم المستخدم</h4>
        <CustomInput className='max-w-130' type='state' value={userName} setValue={setUserName} placeHolder={isLoading ? '... جاري التحميل' : 'اسم المستخدم'} />
      </div>
      {/* Email */}
      <div className='flex items-center justify-between my-4'>
        <h4 className='text-nowrap'>الايميل</h4>
        <CustomInput className='max-w-130' type='state' value={email} setValue={setEmail} placeHolder={isLoading ? '... جاري التحميل' : 'الايميل'} />
      </div>
      {/* Password */}
      <div className='flex items-center justify-between my-4'>
        <h4 className='text-nowrap'>كلمة المرور</h4>
        <CustomInput className='max-w-130' type='state' value={password} setValue={setPassword} placeHolder={isLoading ? '... جاري التحميل' : 'كلمة المرور'} />
      </div>
    </>
  );
}
