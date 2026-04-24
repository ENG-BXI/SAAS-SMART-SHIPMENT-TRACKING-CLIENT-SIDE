import {IOption} from '@/components/custom-select';
import {clientAxiosInstance} from '@/lib/axios/client';
import {DRIVERS, USER} from '@/lib/Constant/routes';
import {useQuery} from '@tanstack/react-query';
interface IDriver {
  id: string;
  userName: string;
}
async function getAllDriversAsOptions() {
  const response = await clientAxiosInstance.get(`${USER}/${DRIVERS}`);
  console.log(response.data.data);
  const data: IOption[] = response.data.data.map((item: IDriver) => {
    return {
      value: item.id,
      label: item.userName
    };
  });
  return data;
}

const useGetAllDriversAsOptions = (enabled: boolean) => {
  return useQuery({
    queryKey: ['drivers'],
    queryFn: getAllDriversAsOptions,
    enabled
  });
};

export default useGetAllDriversAsOptions;
