import serverAxiosInstance from '@/lib/axios/server';
import {SUBSCRIPTION, SUBSCRIPTION_TYPE} from '@/lib/Constant/routes';
import {cacheLife, cacheTag} from 'next/cache';
interface IResponse {
  id: string;
  type: string;
  price: number;
  durationByMonth: number;
}
const GetAllSubscription = async (token?: string) => {
  'use cache';
  cacheLife('days');
  cacheTag('all-subscription');
  const response = await serverAxiosInstance.get(`${SUBSCRIPTION}/${SUBSCRIPTION_TYPE}`, {
    headers: {Authorization: `Bearer ${token}`}
  });
  const data = response.data.data as IResponse[];
  return data;
};

export default GetAllSubscription;
