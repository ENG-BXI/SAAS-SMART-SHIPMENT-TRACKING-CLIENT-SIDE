import serverAxiosInstance from '@/lib/axios/server';
import {TSubscriptionStatus} from '@/lib/Constant/enum';
import {COMPANY, SUBSCRIPTION} from '@/lib/Constant/routes';
import { cacheLife, cacheTag } from 'next/cache';

interface IResponse {
  endDate: string;
  startDate: string;
  status: TSubscriptionStatus;
  type: {
    durationByMonth: number;
    price: number;
    type: string;
  };
}
const GetSubscriptionInfo = async (token?: string) => {
  'use cache'
  cacheLife('days')
  cacheTag('subscription-info')
  const response = await serverAxiosInstance.get(`${SUBSCRIPTION}/${COMPANY}`, {
    headers: {Authorization: `Bearer ${token}`}
  });
  const data = response.data.data as IResponse;
  return data;
};

export default GetSubscriptionInfo;
