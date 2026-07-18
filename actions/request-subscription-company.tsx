'use server';

import serverAxiosInstance from '@/lib/axios/server';
import {COMPANY, REQUEST_SUBSCRIPTION} from '@/lib/Constant/routes';
import {AxiosError} from 'axios';

export const requestSubscriptionCompany = async (formData: FormData) => {
  try {
    const response = await serverAxiosInstance.post(`/${COMPANY}/${REQUEST_SUBSCRIPTION}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return {
      message: response.data.message,
      data: response.data.data,
      error: null
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        message: error.response?.data?.message ?? error.message,
        data: null,
        error: error.message
      };
    }
    return {
      message: 'حدث خطأ غير متوقع',
      data: null,
      error
    };
  }
};
