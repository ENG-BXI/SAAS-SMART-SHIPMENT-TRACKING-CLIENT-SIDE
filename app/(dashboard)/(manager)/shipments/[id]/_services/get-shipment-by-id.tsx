import serverAxiosInstance from '@/lib/axios/server';
import {SHIPMENT} from '@/lib/Constant/routes';
import {cacheLife, cacheTag} from 'next/cache';
interface IResponse {
  id: string;
  shipmentNumber: string;
  launchDate: string;
  driver: {
    userName: string;
    phoneNumber: string;
  };
  endDate: string | null;
  way: {
    name: string;
  };
  currentPoint: {
    name: string;
  };
  clients: number;
}
async function GetShipmentById(id: string, token?: string) {
  'use cache';
  cacheLife('days');
  cacheTag(`shipment-info-${id}`);
  const response = await serverAxiosInstance.get(`${SHIPMENT}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = response.data.data as IResponse;
  return data;
}

export default GetShipmentById;
