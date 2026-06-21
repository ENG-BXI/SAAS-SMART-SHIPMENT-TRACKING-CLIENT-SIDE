'use client';
import {socket} from '@/lib/socket.io';
import {useEffect} from 'react';
import {ShipmentEvent} from '../shipment.event';
import {RevalidateShipment} from '../actions';

const ShipmentRealTime = () => {
  useEffect(() => {
    socket.on(ShipmentEvent.ADD, data => {
      console.log(data);
      RevalidateShipment();
    });
    socket.on(ShipmentEvent.EDIT, data => {
      console.log(data);
      RevalidateShipment();
    });
    socket.on(ShipmentEvent.DELETE, data => {
      console.log(data);
      RevalidateShipment();
    });
    socket.on(ShipmentEvent.PAUSE, data => {
      console.log(data);
      RevalidateShipment();
    });
    socket.on(ShipmentEvent.RESUME, data => {
      console.log(data);
      RevalidateShipment();
    });
    socket.on(ShipmentEvent.MOVEMENT, data => {
      console.log(data);
      RevalidateShipment();
    });
  }, []);
  return null;
};

export default ShipmentRealTime;
