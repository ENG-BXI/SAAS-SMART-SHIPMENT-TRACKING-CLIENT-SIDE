import AppSideBar from '@/components/sideBar/app-side-bar';
import {ReactNode} from 'react';

export default function layout({children}: {children: ReactNode}) {
  return (
    <main className='flex h-screen overflow-y-hidden'>
      <AppSideBar />
      <div className='flex-1 px-4 py-12 overflow-y-auto'>{children}</div>
    </main>
  );
}
