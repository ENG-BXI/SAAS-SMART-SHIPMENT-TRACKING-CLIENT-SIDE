'use client';

import {useEffect} from 'react';
import {socket} from '@/lib/socket.io';
import {RevalidateSubscription} from '../_actions';
import {SubscriptionEvent} from '../subscription.event';

const SubscriptionRealTimeListen = () => {
  useEffect(() => {
    socket.on(SubscriptionEvent.ADD_TYPE, data => {
      console.log(data);
      RevalidateSubscription();
    });
    socket.on(SubscriptionEvent.EDIT_TYPE, data => {
      console.log(data);
      RevalidateSubscription();
    });
    socket.on(SubscriptionEvent.DELETE_TYPE, data => {
      console.log(data);
      RevalidateSubscription();
    });
  }, []);
  return null;
};

export default SubscriptionRealTimeListen;
