import React from 'react';

const Layout = ({children}: {children: React.ReactNode}) => {
  return <div className='flex items-center justify-center h-screen bg-gray-200'>{children}</div>;
};

export default Layout;
