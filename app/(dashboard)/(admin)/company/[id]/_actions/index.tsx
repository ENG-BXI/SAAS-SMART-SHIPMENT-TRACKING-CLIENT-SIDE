'use server';

import serverAxiosInstance from '@/lib/axios/server';
import {ACTIVE_SUBSCRIPTION, COMPANY, PAUSE_SUBSCRIPTION} from '@/lib/Constant/routes';
import {AxiosError} from 'axios';
import {updateTag} from 'next/cache';
import {cookies} from 'next/headers';

export async function pauseCompanySubscription(id: string) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    const response = await serverAxiosInstance.patch(`${COMPANY}/${PAUSE_SUBSCRIPTION}/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    updateTag(`company-info/${id}`);
    updateTag('admin-companies');
    updateTag('admin-statistics');
    return {data: response.data, message: response.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) return {data: null, message: error.message, error: error};
    return {data: null, message: error?.toString(), error: error};
  }
}
export async function activeCompanySubscription(id: string) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    const response = await serverAxiosInstance.patch(`${COMPANY}/${ACTIVE_SUBSCRIPTION}/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    updateTag(`company-info/${id}`);
    updateTag('admin-companies');
    updateTag('admin-statistics');
    return {data: response.data, message: response.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) return {data: null, message: error.message, error: error};
    return {data: null, message: error?.toString(), error: error};
  }
}
export async function RevalidateCompanyDetails(id: string) {
  updateTag(`company-info/${id}`);
  updateTag('admin-statistics');
  updateTag('admin-companies');
}
