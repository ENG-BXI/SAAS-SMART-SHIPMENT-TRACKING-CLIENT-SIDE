'use client';
import {IOption} from '@/components/custom-select';
import {clientAxiosInstance} from '@/lib/axios/client';
import {CLIENT} from '@/lib/Constant/routes';
import {useQuery} from '@tanstack/react-query';
interface IClient {
  id: string;
  name: string;
}
const getAllClientForSelect = async () => {
  const response = await clientAxiosInstance.get(`${CLIENT}`);
  const data = response.data.data.data as IClient[];
  const convertedClient: IOption[] = data.map(client => ({
    value: client.id,
    label: client.name
  }));
  return convertedClient;
};

const GetAllClientForSelect = () => {
  return useQuery({
    queryKey: ['all-client-for-select'],
    queryFn: getAllClientForSelect
  });
};

export default GetAllClientForSelect;
