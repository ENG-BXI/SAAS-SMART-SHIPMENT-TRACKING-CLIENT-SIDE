import {IResponseWithPagination} from '@/Interfaces/IResponse-with-pagination';
import serverAxiosInstance from '@/lib/axios/server';
import {WAY} from '@/lib/Constant/routes';
import {cacheLife, cacheTag} from 'next/cache';
interface IPoint {
  name: string;
  order: number;
}
interface IWay {
  id: string;
  name: string;
  points: IPoint[];
}
type IResponse = IResponseWithPagination<IWay>;
async function GetAllWays({token, page, search}: {token?: string; page?: string; search?: string}) {
  'use cache';
  cacheLife('days');
  cacheTag('all-ways');
  const url = new URLSearchParams();
  if (page) url.append('page', page);
  if (search) url.append('search', search);
  const response = await serverAxiosInstance.get(`${WAY}?${url.toString()}`, {headers: {Authorization: `Bearer ${token}`}});
  const data = response.data.data as IResponse;
  return data;
}
export default GetAllWays;
