import {COMPANY} from '@/lib/Constant/routes';
import {axiosInstance} from '@/lib/axios';
import {useQuery} from '@tanstack/react-query';
import {ICompanyForTable} from '../_interfaces/company-for-table';

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
  const response = await axiosInstance.get(`/${COMPANY}?page=${page}&search=${search}`);
  return response.data.data as IGetAllCompany;
};
const GetAllCompany = ({page, search}: {page: number; search: string}) => {
  return useQuery({
    queryKey: ['GetAllCompany', page, search],
    queryFn: () => getAllCompany({page, search})
  });
};

export default GetAllCompany;
