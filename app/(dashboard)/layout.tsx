import {ReactNode} from 'react';
import SideBar from '../_components/sideBar';

export default function layout({children}: {children: ReactNode}) {
  return (
    <main className='flex min-h-screen' dir='rtl'>
      <SideBar />
      <div className='flex-1 px-4 py-12'>{children}</div>
    </main>
  );
}
