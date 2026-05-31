'use client';

import {useMe} from '@/services/me';
import {usePathname} from 'next/navigation';

const SHOW_RENEW_WHEN_SUBSCRIPTION_LESS_THAN = 10;

const useSidebar = () => {
  const path = usePathname();
  const pathName = path.split('/').pop();
  const isSelected = (link?: string) => link?.split('/').pop() === pathName;
  const {data: user, isError, isLoading, error} = useMe();
  const isLock = user?.status == 'pending' || user?.status == 'inactive';
  const currentDate = new Date();
  const expireDate = new Date(user?.endSubscriptionDate || '');
  const differentDateByMs = expireDate.getTime() - currentDate.getTime();
  const differentDateByDay = differentDateByMs / (1000 * 60 * 60 * 24);
  const isSubscriptionEnd = differentDateByDay <= SHOW_RENEW_WHEN_SUBSCRIPTION_LESS_THAN && user?.role !== 'admin';

  return {isSelected, isLoading, user, isSubscriptionEnd, isError, error, isLock};
};

export default useSidebar;
