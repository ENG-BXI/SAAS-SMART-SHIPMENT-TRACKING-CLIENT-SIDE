'use client';
import {socket} from '@/lib/socket.io';
import {useEffect} from 'react';
import {ClientEvent} from '../cilent.event';
import {RevalidateClient} from '../actions';

const ClientRealTime = () => {
  useEffect(() => {
    socket.on(ClientEvent.ADD, data => {
      console.log(data);
      RevalidateClient();
    });
    socket.on(ClientEvent.EDIT, data => {
      console.log(data);
      RevalidateClient();
    });
    socket.on(ClientEvent.DELETE, data => {
      console.log(data);
      RevalidateClient();
    });
  }, []);
  return null;
};

export default ClientRealTime;
