'use server';

import {cookies} from 'next/headers';
import {shipmentItemFormData} from '../_schemas/shipment-item';
import serverAxiosInstance from '@/lib/axios/server';
import {ADD_CLIENT_AND_SHIPMENT_ITEM, DELETE_SHIPMENT_ITEM, MOVE_SHIPMENT_WITH_NOTIFICATION, MOVE_SHIPMENT_WITHOUT_NOTIFICATION, PAUSE_SHIPMENT, RESUME_SHIPMENT, SHIPMENT, UPDATE_SHIPMENT_ITEM} from '@/lib/Constant/routes';
import {AxiosError} from 'axios';
import {updateTag} from 'next/cache';
interface IResponseMoveData {
  id: string;
  shipmentNumber: string;
  launchDate: string;
  endDate: string | null;
  wayId: string;
  currentPointId: string;
  driverId: string;
  companyId: string;
  isPaused: boolean;
  isCompleted: boolean;
}
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
export async function UpdateShipmentItem(id: string, data: shipmentItemFormData) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    const response = await serverAxiosInstance.put(`${SHIPMENT}/${id}/${UPDATE_SHIPMENT_ITEM}`, data, {
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
export async function DeleteShipmentItem(id: string) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    const response = await serverAxiosInstance.delete(`${SHIPMENT}/${id}/${DELETE_SHIPMENT_ITEM}`, {
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
    const data = response.data.data as IResponseMoveData;
    if (data.isCompleted) {
      updateTag('finished-shipment');
    } else {
      updateTag('current-shipment');
    }
    updateTag(`shipment-info-${id}`);
    return {data, message: response.data.message, error: null};
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
    updateTag(`shipment-info-${id}`);
    updateTag('current-shipment');
    const data = response.data.data as IResponseMoveData;
    if (data.isCompleted) {
      updateTag('finished-shipment');
    }
    return {data, message: response.data.message, error: null};
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
    updateTag(`current-shipment`);
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
    updateTag(`current-shipment`);
    return {data: response.data.data, message: response.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) {
      return {data: null, message: error.response?.data?.message, error: error.message};
    }
    return {data: null, message: 'حدث خطأ ما , يرجى المحاولة مرة اخرى', error: error?.toString()};
  }
}
