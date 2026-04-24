'use server';
import {cookies} from 'next/headers';
import {clientFormData} from '../_schemas/client-schema';
import serverAxiosInstance from '@/lib/axios/server';
import {CLIENT} from '@/lib/Constant/routes';
import {AxiosError} from 'axios';
import { updateTag } from 'next/cache';

export const AddClient = async (data: clientFormData) => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const client = {
    ...data,
    contactWays: data.contactWays.map(contactWay => ({
      ...contactWay,
      isPrimary: Boolean(contactWay.isPrimary)
    }))
  };
  try {
    const response = await serverAxiosInstance.post(CLIENT, client, { headers: { Authorization: `Bearer ${token}` } });
    updateTag('all-client');
    return {message: response.data.message, data: response.data.data, error: null};
  } catch (error) {
    if (error instanceof AxiosError) return {message: 'Add Client Failed', error: error.response?.data.message, data: null};
  }
};
