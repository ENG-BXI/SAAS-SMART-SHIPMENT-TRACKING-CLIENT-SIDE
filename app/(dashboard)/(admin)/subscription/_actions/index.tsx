'use server';

import serverAxiosInstance from '@/lib/axios/server';
import {SUBSCRIPTION, SUBSCRIPTION_TYPE} from '@/lib/Constant/routes';
import {AxiosError} from 'axios';
import {updateTag} from 'next/cache';
import {cookies} from 'next/headers';
import {SubscriptionTypeFormData} from '../_schemas/subscription-schema';

export const createSubscriptionType = async (data: SubscriptionTypeFormData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  try {
    const response = await serverAxiosInstance.post(`/${SUBSCRIPTION}/${SUBSCRIPTION_TYPE}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    updateTag('all-subscription');

    return {message: response.data.message, data: response.data.data, error: null};
  } catch (error) {
    if (error instanceof AxiosError) return {message: error.response?.data.message, data: null, error: error.message};
    return {message: 'حدث خطأ غير متوقع', data: null, error: error};
  }
};

export const editSubscriptionType = async (id: string, data: SubscriptionTypeFormData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  try {
    const response = await serverAxiosInstance.patch(`/${SUBSCRIPTION}/${SUBSCRIPTION_TYPE}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    updateTag('all-subscription');

    return {message: response.data.message, data: response.data.data, error: null};
  } catch (error) {
    if (error instanceof AxiosError) return {message: error.response?.data.message, data: null, error: error.message};
    return {message: 'حدث خطأ غير متوقع', data: null, error: error};
  }
};

export const deleteSubscriptionType = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  try {
    const response = await serverAxiosInstance.delete(`/${SUBSCRIPTION}/${SUBSCRIPTION_TYPE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    updateTag('all-subscription');

    return {message: response.data.message, data: response.data.data, error: null};
  } catch (error) {
    if (error instanceof AxiosError) return {message: error.response?.data.message, data: null, error: error.message};
    return {message: 'حدث خطأ غير متوقع', data: null, error: error};
  }
};

export async function RevalidateSubscription() {
  updateTag('all-subscription');
}