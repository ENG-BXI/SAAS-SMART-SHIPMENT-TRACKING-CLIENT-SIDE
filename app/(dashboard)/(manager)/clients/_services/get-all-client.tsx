import {IResponseWithPagination} from '@/Interfaces/IResponse-with-pagination';
import serverAxiosInstance from '@/lib/axios/server';
import {CLIENT} from '@/lib/Constant/routes';
import {cacheLife, cacheTag} from 'next/cache';
interface IContactWay {
  text: string;
  isPrimary: boolean;
  contactType: 'phoneNumber' | 'email';
}
interface IClient {
  id: string;
  name: string;
  contactWays: IContactWay[];
}
type IResponse = IResponseWithPagination<IClient>;
async function GetAllClient({token, page, search}: {token?: string; page?: string; search?: string}) {
  'use cache';
  cacheTag('all-client');
  cacheLife('days');
  const searchParams = new URLSearchParams();
  if (page) searchParams.set('page', page.toString());
  if (search) searchParams.set('search', search.toString());
  const response = await serverAxiosInstance.get(`${CLIENT}?${searchParams.toString()}`, {headers: {Authorization: `Bearer ${token}`}});
  return response.data.data as IResponse;
}

export default GetAllClient;
