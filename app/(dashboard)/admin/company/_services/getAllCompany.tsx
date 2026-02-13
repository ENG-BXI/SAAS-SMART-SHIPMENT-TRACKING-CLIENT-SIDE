import {COMPANY} from '@/app/_constant/routes';
import {axiosInstance} from '@/app/_provider/axios';
import {useQuery} from '@tanstack/react-query';
import {ICompanyForTable} from '../_interfaces/ICompanyForTable';

interface IGetAllCompany {
  data: ICompanyForTable[];
  number_of_page: number;
  page: number;
  total: number;
  // TODO add in Backend
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
const getAllCompany = async ({page}:{page:number}) => {
  const response = await axiosInstance.get(`/${COMPANY}?page=${page}`);
  return response.data.data as IGetAllCompany;
};
const GetAllCompany = ({page}:{page:number}) => {
  return useQuery({
    queryKey: ['GetAllCompany',page],
    queryFn: ()=>getAllCompany({page})
  });
};

export default GetAllCompany;
