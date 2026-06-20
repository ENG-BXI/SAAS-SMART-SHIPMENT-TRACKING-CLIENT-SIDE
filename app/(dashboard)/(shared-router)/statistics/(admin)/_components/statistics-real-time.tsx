'use client';
import {socket} from '@/lib/socket.io';
import {useEffect} from 'react';
import {RevalidateAdminStatistics} from '../action';
import {StatisticsEvent} from '../../statistics.event';
import {RevalidateManagerStatistics} from '../../(manager)/action';

const StatisticsRealTime = () => {
  useEffect(() => {
    socket.on(StatisticsEvent.ADMIN, data => {
      console.log(data);
      RevalidateAdminStatistics();
    });
    socket.on(StatisticsEvent.MANAGER, data => {
      console.log(data);
      RevalidateManagerStatistics();
    });
  }, []);
  return null;
};

export default StatisticsRealTime;
