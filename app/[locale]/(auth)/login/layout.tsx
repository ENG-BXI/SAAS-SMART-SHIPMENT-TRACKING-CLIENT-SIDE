import React from 'react';
import ImageSide from './components/image-side';

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex items-center h-screen bg-white dark:bg-[#262626]'>
      <ImageSide />
      {children}
    </div>
  );
};

export default Layout;
