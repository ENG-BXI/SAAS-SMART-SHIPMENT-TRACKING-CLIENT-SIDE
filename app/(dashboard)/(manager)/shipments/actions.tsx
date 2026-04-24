'use server';

import {SHIPMENT} from '@/lib/Constant/routes';
import {AxiosError} from 'axios';
import {updateTag} from 'next/cache';
import {shipmentFormData} from './_schema/shipment-schema';
import {cookies} from 'next/headers';
import serverAxiosInstance from '@/lib/axios/server';

export const AddShipmentAction = async (data: shipmentFormData) => {
  try {
    const cookie = await cookies();
    const token = cookie.get('token')?.value;
    const res = await serverAxiosInstance.post(`${SHIPMENT}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    updateTag('current-shipment');
    return {message: res.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('error in add shipment action', error.response?.data.message);
      return {message: null, error: error.response?.data.message as string | string[]};
    }
    return {message: null, error: (error as Error).message || 'حدث خطأ ما'};
  }
};
