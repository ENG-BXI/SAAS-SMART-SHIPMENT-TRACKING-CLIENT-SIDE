import {ReactNode} from 'react';
import AppSideBar from '@/components/sideBar';

export default function layout({children}: {children: ReactNode}) {
  return (
    <main className='flex min-h-screen' dir='rtl'>
      <AppSideBar />
      <div className='flex-1 px-4 py-12'>{children}</div>
    </main>
  );
}
