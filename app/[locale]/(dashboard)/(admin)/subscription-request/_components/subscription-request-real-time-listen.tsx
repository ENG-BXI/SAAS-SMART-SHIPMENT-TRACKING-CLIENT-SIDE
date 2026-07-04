'use client';

import {useEffect} from 'react';
import {socket} from '@/lib/socket.io';
import {RevalidateSubscriptionRequest} from '../_actions';
import {SubscriptionEvent} from '../../subscription/subscription.event';

const SubscriptionRequestRealTimeListen = () => {
  useEffect(() => {
    socket.on(SubscriptionEvent.ACCEPT_COMPANY, data => {
      console.log(data);
      RevalidateSubscriptionRequest();
    });
  }, []);
  return null;
};

export default SubscriptionRequestRealTimeListen;
