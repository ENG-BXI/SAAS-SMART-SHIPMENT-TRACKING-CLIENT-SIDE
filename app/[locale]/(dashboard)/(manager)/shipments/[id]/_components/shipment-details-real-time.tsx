'use client';
import {socket} from '@/lib/socket.io';
import {useEffect} from 'react';
import {ShipmentEvent} from '../../shipment.event';
import {RevalidateShipmentDetails} from '../_actions';

const ShipmentDetailsRealTime = ({id}: {id: string}) => {
  useEffect(() => {
    socket.on(ShipmentEvent.ADD_ITEM, data => {
      console.log(data);
      RevalidateShipmentDetails(id);
    });
    socket.on(ShipmentEvent.EDIT_ITEM, data => {
      console.log(data);
      RevalidateShipmentDetails(id);
    });
    socket.on(ShipmentEvent.DELETE_ITEM, data => {
      console.log(data);
      RevalidateShipmentDetails(id);
    });
    socket.on(ShipmentEvent.PAUSE, data => {
      console.log(data);
      RevalidateShipmentDetails(id);
    });
    socket.on(ShipmentEvent.RESUME, data => {
      console.log(data);
      RevalidateShipmentDetails(id);
    });
    socket.on(ShipmentEvent.MOVEMENT, data => {
      console.log(data);
      RevalidateShipmentDetails(id);
    });
  }, [id]);
  return null;
};

export default ShipmentDetailsRealTime;
