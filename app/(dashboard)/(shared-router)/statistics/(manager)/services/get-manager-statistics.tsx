import serverAxiosInstance from '@/lib/axios/server';
import {MANAGER_STATISTICS, STATISTICS} from '@/lib/Constant/routes';
import { cacheLife, cacheTag } from 'next/cache';
interface IStatistics {
  numberOfShipments: number;
  numberOfCurrentShipments: number;
  numberOfFinishedShipments: number;
  numberOfClients: number;
  numberOfWays: number;
}
const GetManagerStatistics = async (token?: string) => {
  'use cache'
  cacheLife('days')
  cacheTag('manager-statistics')
  const response = await serverAxiosInstance.get(`/${STATISTICS}/${MANAGER_STATISTICS}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = response.data.data as IStatistics;
  return data;
};

export default GetManagerStatistics;
