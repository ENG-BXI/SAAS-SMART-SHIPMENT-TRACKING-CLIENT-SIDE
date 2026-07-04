'use client';
import {IOption} from '@/components/custom-select';
import {WAY} from '@/lib/Constant/routes';
import {useQuery} from '@tanstack/react-query';
import {clientAxiosInstance} from '@/lib/axios/client';
interface IWay {
  id: string;
  name: string;
}
const getAllWaysAsOptions = async () => {
  const response = await clientAxiosInstance.get(`${WAY}`);
  const data: IOption[] = response.data.data.data.map((way: IWay) => {
    return {
      value: way.id,
      label: way.name
    };
  });
  return data;
};

function useGetAllWaysAsOptions(enabled: boolean) {
  return useQuery({
    queryKey: ['ways'],
    queryFn: getAllWaysAsOptions,
    enabled
  });
}
export default useGetAllWaysAsOptions;
