import serverAxiosInstance from '@/lib/axios/server';
import {COMPANY, REQUEST_SUBSCRIPTION} from '@/lib/Constant/routes';
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
    voucherPublicId: string;
    voucherSecureUrl: string;
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
  const response = await serverAxiosInstance.get(`/${COMPANY}/${REQUEST_SUBSCRIPTION}`, {
    headers: {Authorization: `Bearer ${token}`}
  });

  const responseData = response.data.data as ISubscriptionRequest;
  console.log('====================================');
  console.log(responseData);
  console.log('====================================');
  return responseData;
};

export default GetSubscriptionRequests;
