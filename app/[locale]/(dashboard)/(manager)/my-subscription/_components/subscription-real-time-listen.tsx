'use client';

import {useEffect} from 'react';
import {socket} from '@/lib/socket.io';
import {SubscriptionEvent} from '@/app/[locale]/(dashboard)/(admin)/subscription/subscription.event';
import {RevalidateMySubscription} from '../_actions';

const MySubscriptionRealTimeListen = () => {
  useEffect(() => {
    socket.on(SubscriptionEvent.CHANGE_SUBSCRIPTION, data => {
      console.log(data);
      RevalidateMySubscription();
    });
  }, []);
  return null;
};

export default MySubscriptionRealTimeListen;
