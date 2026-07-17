'use server';

import serverAxiosInstance from '@/lib/axios/server';
import {COMPANY, SUBSCRIPTION} from '@/lib/Constant/routes';
import {AxiosError} from 'axios';
import {updateTag} from 'next/cache';
import {cookies} from 'next/headers';
export async function changeCompanySubscription(subscriptionTypeId: string, formData: FormData) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    const response = await serverAxiosInstance.patch(`${SUBSCRIPTION}/${COMPANY}/${subscriptionTypeId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    const data = response.data;
    updateTag('subscription-info');
    updateTag('all-subscription');
    return {
      data: data.data,
      message: data.message,
      error: null
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        data: null,
        message: error.response?.data?.message || error.message,
        error: error.message
      };
    }
    return {
      data: null,
      message: 'حدث خطأ ما',
      error
    };
  }
}

export async function RevalidateMySubscription() {
  updateTag('subscription-info');
  updateTag('all-subscription');
}
