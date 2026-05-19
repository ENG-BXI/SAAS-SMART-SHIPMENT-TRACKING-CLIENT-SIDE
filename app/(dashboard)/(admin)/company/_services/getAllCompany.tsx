import {COMPANY} from '@/lib/Constant/routes';
import serverAxiosInstance from '@/lib/axios/server';
import {cacheLife, cacheTag} from 'next/cache';
import {ICompanyForTable} from '../_interfaces/company-for-table';
import {IResponseWithPagination} from '@/Interfaces/IResponse-with-pagination';
interface IResponseCompany {
  createdAt: string;
  id: string;
  location: string;
  name: string;
  updatedAt: string;
  subscriptionStatus: 'active' | 'inactive';
  users: [{email: string}];
  _count: {
    clients: number;
  };
}

const GetAllCompany = async ({token, page, search}: {token?: string; page?: number; search?: string}) => {
  'use cache';
  cacheLife('days');
  cacheTag('admin-companies');
  const response = await serverAxiosInstance.get(`${COMPANY}`, {
    params: {
      page,
      search
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log(response.data.data);
  const responseData = response.data.data as IResponseWithPagination<IResponseCompany>;
  const data: ICompanyForTable[] = responseData.data.map(company => {
    const companyData: ICompanyForTable = {
      id: company.id,
      name: company.name,
      location: company.location,
      numberOfClient: company._count.clients,
      companyEmail: company.users[0].email,
      subscriptionStatus: company.subscriptionStatus
    };
    return companyData;
  });
  return {...responseData, data: data};
};

export default GetAllCompany;
