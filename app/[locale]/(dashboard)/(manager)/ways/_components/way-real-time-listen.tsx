'use client';

import {useEffect} from 'react';
import {RevalidateWay} from '../_actions';
import {socket} from '@/lib/socket.io';
import {WayEvent} from '../way.event';

const WayRealTimeListen = () => {
  useEffect(() => {
    socket.on(WayEvent.ADD, data => {
      console.log(data);
      RevalidateWay();
    });
    socket.on(WayEvent.EDIT, data => {
      console.log(data);
      RevalidateWay();
    });
    socket.on(WayEvent.DELETE, data => {
      console.log(data);
      RevalidateWay();
    });
  }, []);
  return null;
};

export default WayRealTimeListen;
