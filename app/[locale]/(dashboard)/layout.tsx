import AppSideBar from '@/components/sideBar/app-side-bar';
import {ReactNode} from 'react';
export default function layout({children}: {children: ReactNode}) {
  return (
    <main className='flex bg-white dark:bg-[#18191b] h-screen overflow-y-hidden'>
      <AppSideBar />
      <div className='flex-1 bg-white dark:bg-[#18191b] px-4 py-12 overflow-y-auto xl:m-2 border rounded-lg '>
        <div className='2xl:max-w-7xl mx-auto'>{children}</div>
      </div>
    </main>
  );
}
