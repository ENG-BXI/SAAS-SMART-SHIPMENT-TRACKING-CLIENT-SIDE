import React, {Suspense} from 'react';
import SideBarSkeleton from './side-bar-skeleton';
import AppSideBarClient from './side-bar';

const AppSideBar = () => {
  return (
    <Suspense fallback={<SideBarSkeleton />}>
      <AppSideBarClient />
    </Suspense>
  );
};

export default AppSideBar;
