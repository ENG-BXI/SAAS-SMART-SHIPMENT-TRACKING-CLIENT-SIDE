import serverAxiosInstance from '@/lib/axios/server';
import {COMPANY, REQUEST_SUBSCRIPTION} from '@/lib/Constant/routes';
import {cacheLife, cacheTag} from 'next/cache';
import {TSubscriptionStatus} from '@/lib/Constant/enum';

export interface ICompany {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  users: [
    {
      email: string;
    }
  ];
  subscription: {
    startDate: string;
    endDate: string;
    status: TSubscriptionStatus;
    newTypeId: string;
    type: {
      id: string;
      type: string;
      price: number;
      durationByMonth: number;
    };
  };
}
export interface ISubscriptionRequest {
  companies: ICompany[];
  pendingCompanyCount: number;
  changeCompanyCount: number;
}

const GetSubscriptionRequests = async (token?: string) => {
  'use cache';
  cacheLife('days');
  cacheTag('subscription-requests');

  const response = await serverAxiosInstance.get(`/${COMPANY}/${REQUEST_SUBSCRIPTION}`, {
    headers: {Authorization: `Bearer ${token}`}
  });

  const responseData = response.data.data as ISubscriptionRequest;
  return responseData;
};

export default GetSubscriptionRequests;
