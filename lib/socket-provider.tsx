// providers/socket-provider.tsx
'use client';

import {useEffect} from 'react';
import {socket} from './socket.io';

export default function SocketProvider({children}: {children: React.ReactNode}) {
  useEffect(() => {
    console.log('====================================');
    console.log('CONNECTED');
    console.log('====================================');
    socket.connect();

    return () => {
      console.log('====================================');
      console.log('DISCONNECTED');
      console.log('====================================');
      socket.disconnect();
    };
  }, []);

  return children;
}
