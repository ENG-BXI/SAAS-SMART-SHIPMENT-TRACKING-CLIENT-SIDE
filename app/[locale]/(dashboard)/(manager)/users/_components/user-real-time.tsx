'use client';
import {socket} from '@/lib/socket.io';
import {useEffect} from 'react';
import {UserEvent} from '../user.event';
import {RevalidateUser} from '../_actions';

const UserRealTime = () => {
  useEffect(() => {
    socket.on(UserEvent.ADD, data => {
      console.log(data);
      RevalidateUser();
    });
    socket.on(UserEvent.EDIT, data => {
      console.log(data);
      RevalidateUser();
    });
    socket.on(UserEvent.DELETE, data => {
      console.log(data);
      RevalidateUser();
    });
  }, []);
  return null;
};

export default UserRealTime;
