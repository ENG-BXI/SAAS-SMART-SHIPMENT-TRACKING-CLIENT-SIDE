import {cacheLife, cacheTag} from 'next/cache';
import {SHIPMENT, FINISHED} from '@/lib/Constant/routes';
import {IResponseWithPagination} from '@/Interfaces/IResponse-with-pagination';
import {IShipmentFromBackend} from '../_interfaces/IShipment-From-Backend';
import serverAxiosInstance from '@/lib/axios/server';

export async function getFinishedShipments(token?: string, search?: string, page?: string) {
  'use cache';
  cacheTag('finished-shipment');
  cacheLife('hours');
  const SearchParams = new URLSearchParams();
  if (search) {
    SearchParams.append('search', search);
  }
  if (page) {
    SearchParams.append('page', page);
  }
  const response = await serverAxiosInstance.get(`${SHIPMENT}/${FINISHED}?${SearchParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = response.data.data as IResponseWithPagination<IShipmentFromBackend>;
  return data;
}
