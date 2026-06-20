'use client';
import { ShipmentEvent } from '@/app/(dashboard)/(manager)/shipments/shipment.event';
import {socket} from '@/lib/socket.io';
import {useEffect} from 'react';
import { RevalidateClientShipmentDetails } from '../action';

const ClientDetailsRealTime = () => {
  useEffect(() => {
    socket.on(ShipmentEvent.ADD_ITEM, data => {
      console.log(data);
      RevalidateClientShipmentDetails();
    });
    socket.on(ShipmentEvent.EDIT_ITEM, data => {
      console.log(data);
      RevalidateClientShipmentDetails();
    });
    socket.on(ShipmentEvent.DELETE_ITEM, data => {
      console.log(data);
      RevalidateClientShipmentDetails();
    });
    socket.on(ShipmentEvent.PAUSE, data => {
      console.log(data);
      RevalidateClientShipmentDetails();
    });
    socket.on(ShipmentEvent.RESUME, data => {
      console.log(data);
      RevalidateClientShipmentDetails();
    });
    socket.on(ShipmentEvent.MOVEMENT, data => {
      console.log(data);
      RevalidateClientShipmentDetails();
    });
  }, []);
  return null;
};

export default ClientDetailsRealTime;
