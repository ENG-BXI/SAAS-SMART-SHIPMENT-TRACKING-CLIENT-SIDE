'use server';
import serverAxiosInstance from '@/lib/axios/server';
import {COMPANY, SUBSCRIPTION} from '@/lib/Constant/routes';
import {AxiosError} from 'axios';
import {updateTag} from 'next/cache';
import {cookies} from 'next/headers';

export async function acceptCompany(id: string, typeId: string) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const payload = {
    type: typeId
  };
  try {
    const response = await serverAxiosInstance.post(`/${SUBSCRIPTION}/${COMPANY}/${id}`, payload, {
      headers: {Authorization: `Bearer ${token}`}
    });
    updateTag('subscription-requests');
    updateTag('admin-companies');
    updateTag('admin-statistics');
    return {data: response.data.data, message: 'Accept Company Successful', error: null};
  } catch (error) {
    if (error instanceof AxiosError) return {data: null, message: error.message, error: error.stack};
    return {data: null, message: 'حدث خطا ما', error: error?.toString()};
  }
}
