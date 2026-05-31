import serverAxiosInstance from '@/lib/axios/server';
import {TSubscriptionStatus} from '@/lib/Constant/enum';
import {COMPANY} from '@/lib/Constant/routes';
import React from 'react';
import {ICompanyWithSubscription} from '../../_interfaces/company-with-subscription';
import {cacheLife, cacheTag} from 'next/cache';

interface IResponse {
  name: string;
  location: string;
  _count: {
    clients: number;
  };
  subscription: {
    startDate: string;
    endDate: string;
    status: TSubscriptionStatus;
    type: {
      type: string;
      durationByMonth: number;
    };
  };
  users: [
    {
      email: string;
    }
  ];
}
const GetCompanyInfo = async ({id, token}: {id: string; token?: string}) => {
  'use cache';
  cacheLife('days');
  cacheTag(`company-info/${id}`);
  const response = await serverAxiosInstance.get(`${COMPANY}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = response.data.data as IResponse;
  const convertedData: ICompanyWithSubscription = {
    name: data.name,
    location: data.location,
    numberOfClient: data._count.clients,
    companyEmail: data.users[0].email,
    subscriptionStatus: data.subscription.status,
    subscriptionStartDate: data.subscription.startDate,
    subscriptionEndDate: data.subscription.endDate,
    subscriptionType: data.subscription.type.type,
    subscriptionImage: 'TEMP IMage'
  };
  return convertedData;
};

export default GetCompanyInfo;
