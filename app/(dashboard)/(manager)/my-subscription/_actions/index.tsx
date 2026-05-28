'use server';

import serverAxiosInstance from '@/lib/axios/server';
import {COMPANY, SUBSCRIPTION} from '@/lib/Constant/routes';
import {AxiosError} from 'axios';
import {updateTag} from 'next/cache';
import {cookies} from 'next/headers';

export async function changeCompanySubscription(subscriptionTypeId: string) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    const response = await serverAxiosInstance.patch(`${SUBSCRIPTION}/${COMPANY}/${subscriptionTypeId}`, {}, {headers: {Authorization: `Bearer ${token}`}});
    const data = response.data;
    updateTag('subscription-info');
    updateTag('all-subscription');
    return {data: data.data, message: data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) return {data: null, message: error.message, error: error.message};
    return {data: null, message: 'حدث خطا ما', error};
  }
}
