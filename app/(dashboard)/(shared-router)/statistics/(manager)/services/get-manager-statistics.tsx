import serverAxiosInstance from '@/lib/axios/server';
import {MANAGER_STATISTICS, STATISTICS} from '@/lib/Constant/routes';
interface IStatistics {
  numberOfShipments: number;
  numberOfCurrentShipments: number;
  numberOfFinishedShipments: number;
  numberOfClients: number;
  numberOfWays: number;
}
const GetManagerStatistics = async (token?: string) => {
  const response = await serverAxiosInstance.get(`/${STATISTICS}/${MANAGER_STATISTICS}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = response.data.data as IStatistics;
  return data;
};

export default GetManagerStatistics;
