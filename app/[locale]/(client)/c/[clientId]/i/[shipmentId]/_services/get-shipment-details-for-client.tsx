import serverAxiosInstance from '@/lib/axios/server';
import {SHIPMENT_NUMBER} from '@/lib/Constant/enum';
import {CLIENT, SHIPMENT} from '@/lib/Constant/routes';
import {cacheLife, cacheTag} from 'next/cache';
interface IShipmenItem {
  name: string;
  quantity: number;
  isBreakable: boolean;
}
export interface IPoint {
  name: string;
  isCurrent: boolean;
  lat?: number;
  lng?: number;
}
export interface IContactWay {
  text: string;
  contactType: string;
  isPrimary: boolean;
}
interface IResponse {
  shipmentNumber: string;
  wayPointsLength: number;
  firstPoint: string;
  lastPoint: string;
  shipmentStatus: SHIPMENT_NUMBER;
  companyName: string;
  reminderPoint: number;
  percentageOfPoint: number;
  shipmentItem: IShipmenItem[];
  clientNameAndContactWay: {name: string; contactWays: IContactWay[]};
  allPointName: IPoint[];
  driverInfo: {
    userName: string;
    phoneNumber: string;
    email: string;
  };
  nextPoint: {id: string; name: string};
}
export async function GetShipmentDetailsForClient(clientId: string, shipmentId: string, token?: string) {
  // 'use cache'
  // cacheLife('hours')
  // cacheTag('client-shipment-details')
  const response = await serverAxiosInstance.get(`${CLIENT}/${clientId}/${SHIPMENT}/${shipmentId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = response.data.data as IResponse;
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  return data;
}
