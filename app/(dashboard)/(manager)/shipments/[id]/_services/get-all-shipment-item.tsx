import {IResponseWithPagination} from '@/Interfaces/IResponse-with-pagination';
import serverAxiosInstance from '@/lib/axios/server';
import {ITEMS, SHIPMENT} from '@/lib/Constant/routes';
import {cacheLife, cacheTag} from 'next/cache';
interface ShipmentItem {
  id: string;
  client: {name: string};
  isBreakable: boolean;
  name: string;
  quantity: number;
}
const GetAllShipmentItem = async (shipmentId: string, token?: string, search?: string, page?: string) => {
  'use cache';
  cacheLife('days');
  cacheTag('all-shipment-item');
  const response = await serverAxiosInstance.get(`${SHIPMENT}/${shipmentId}/${ITEMS}`, {
    params: {search, page},
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = response.data.data as IResponseWithPagination<ShipmentItem>;
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  return data;
};

export default GetAllShipmentItem;
