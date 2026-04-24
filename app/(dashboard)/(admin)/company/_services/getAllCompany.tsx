import {COMPANY} from '@/lib/Constant/routes';
import {useQuery} from '@tanstack/react-query';
import {ICompanyForTable} from '../_interfaces/company-for-table';
import { clientAxiosInstance } from '@/lib/axios/client';

interface IGetAllCompany {
  data: ICompanyForTable[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
const getAllCompany = async ({page, search}: {page: number; search: string}) => {
  const response = await clientAxiosInstance.get(`/${COMPANY}?page=${page}&search=${search}`);
  return response.data.data as IGetAllCompany;
};
const GetAllCompany = ({page, search}: {page: number; search: string}) => {
  return useQuery({
    queryKey: ['GetAllCompany', page, search],
    queryFn: () => getAllCompany({page, search})
  });
};

export default GetAllCompany;
