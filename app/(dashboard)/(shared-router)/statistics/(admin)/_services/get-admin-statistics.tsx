import {ADMIN_STATISTICS, STATISTICS} from '@/lib/Constant/routes';
import serverAxiosInstance from '@/lib/axios/server';
import {cacheLife, cacheTag} from 'next/cache';
interface ICompanyByMonth {
  month: string;
  count: number;
}
interface IResponse {
  numberOfCompanies: number;
  numberOfNotes: number;
  numberOfVisited: number;
  numberOfSubscriptionRequest: number;
  numberOfWillSubscriptionFinish: number;
  numberOfPausedCompanies: number;
  numberOfCompanyByMonth: ICompanyByMonth[];
}
export const GetAdminStatistics = async () => {
  'use cache';
  cacheLife('hours');
  cacheTag('admin-statistics');
  const response = await serverAxiosInstance.get(`${STATISTICS}/${ADMIN_STATISTICS}`);
  const data = response.data.data as IResponse;
  return data;
};
