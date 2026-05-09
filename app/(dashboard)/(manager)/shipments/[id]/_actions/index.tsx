'use server';

import {cookies} from 'next/headers';
import {shipmentItemFormData} from '../_schemas/shipment-item';
import serverAxiosInstance from '@/lib/axios/server';
import {ADD_CLIENT_AND_SHIPMENT_ITEM, MOVE_SHIPMENT_WITH_NOTIFICATION, MOVE_SHIPMENT_WITHOUT_NOTIFICATION, PAUSE_SHIPMENT, RESUME_SHIPMENT, SHIPMENT} from '@/lib/Constant/routes';
import {AxiosError} from 'axios';
import {updateTag} from 'next/cache';

export async function CreateShipmentItem(id: string, data: shipmentItemFormData) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    const response = await serverAxiosInstance.post(`${SHIPMENT}/${id}/${ADD_CLIENT_AND_SHIPMENT_ITEM}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    updateTag('all-shipment-item');
    return {data: response.data.data, message: response.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) {
      return {data: null, message: error.response?.data?.message, error: error.message};
    }
    return {data: null, message: 'حدث خطأ ما , يرجى المحاولة مرة اخرى', error: error?.toString()};
  }
}

export async function MoveShipmentWithNotification(id: string) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    const response = await serverAxiosInstance.put(`${SHIPMENT}/${id}/${MOVE_SHIPMENT_WITH_NOTIFICATION}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    updateTag('all-shipment-item');
    updateTag(`shipment-info-${id}`);
    return {data: response.data.data, message: response.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) {
      return {data: null, message: error.response?.data?.message, error: error.message};
    }
    return {data: null, message: 'حدث خطأ ما , يرجى المحاولة مرة اخرى', error: error?.toString()};
  }
}

export async function MoveShipmentWithoutNotification(id: string) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    const response = await serverAxiosInstance.put(`${SHIPMENT}/${id}/${MOVE_SHIPMENT_WITHOUT_NOTIFICATION}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    updateTag('all-shipment-item');
    updateTag(`shipment-info-${id}`);
    return {data: response.data.data, message: response.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) {
      return {data: null, message: error.response?.data?.message, error: error.message};
    }
    return {data: null, message: 'حدث خطأ ما , يرجى المحاولة مرة اخرى', error: error?.toString()};
  }
}

export async function PauseShipment(id: string) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    const response = await serverAxiosInstance.put(`${SHIPMENT}/${id}/${PAUSE_SHIPMENT}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    updateTag('all-shipment-item');
    updateTag(`shipment-info-${id}`);
    return {data: response.data.data, message: response.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) {
      return {data: null, message: error.response?.data?.message, error: error.message};
    }
    return {data: null, message: 'حدث خطأ ما , يرجى المحاولة مرة اخرى', error: error?.toString()};
  }
}
export async function ResumeShipment(id: string) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    const response = await serverAxiosInstance.put(`${SHIPMENT}/${id}/${RESUME_SHIPMENT}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    updateTag('all-shipment-item');
    updateTag(`shipment-info-${id}`);
    return {data: response.data.data, message: response.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) {
      return {data: null, message: error.response?.data?.message, error: error.message};
    }
    return {data: null, message: 'حدث خطأ ما , يرجى المحاولة مرة اخرى', error: error?.toString()};
  }
}
