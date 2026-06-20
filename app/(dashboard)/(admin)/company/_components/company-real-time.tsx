'use client';
import {socket} from '@/lib/socket.io';
import {useEffect} from 'react';
import {CompanyEvent} from '../company.event';
import {RevalidateCompany} from '../_action';
import {SubscriptionEvent} from '../../subscription/subscription.event';
import {RevalidateSubscription} from '../../subscription/_actions';

const CompanyRealTime = () => {
  useEffect(() => {
    socket.on(CompanyEvent.ADD, data => {
      console.log(data);
      RevalidateCompany();
    });
    socket.on(CompanyEvent.EDIT, data => {
      console.log(data);
      RevalidateCompany();
    });
    socket.on(CompanyEvent.DELETE, data => {
      console.log(data);
      RevalidateCompany();
    });
    socket.on(SubscriptionEvent.ADD, data => {
      console.log(data);
      RevalidateSubscription();
    });
    socket.on(SubscriptionEvent.EDIT, data => {
      console.log(data);
      RevalidateSubscription();
    });
    socket.on(SubscriptionEvent.DELETE, data => {
      console.log(data);
      RevalidateSubscription();
    });
  }, []);
  return null;
};

export default CompanyRealTime;
