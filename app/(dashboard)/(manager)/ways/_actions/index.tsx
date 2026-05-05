'use server';

import serverAxiosInstance from '@/lib/axios/server';
import {wayFormData} from '../_schemas/way-schema';
import {WAY} from '@/lib/Constant/routes';
import {AxiosError} from 'axios';
import {updateTag} from 'next/cache';

export async function CreateWay(token: string, data: wayFormData) {
  try {
    const response = await serverAxiosInstance.post(WAY, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    updateTag('all-ways');
    return {data: response.data, message: response.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) {
      return {data: null, message: error.message, error: error.response?.data?.message};
    }
    return {data: null, message: 'حدث خطأ', error: null};
  }
}
