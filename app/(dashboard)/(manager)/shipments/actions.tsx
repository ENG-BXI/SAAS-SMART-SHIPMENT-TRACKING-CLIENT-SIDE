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
    updateTag('manager-statistics');
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

export const UpdateShipmentAction = async (id: string, data: shipmentFormData) => {
  try {
    const cookie = await cookies();
    const token = cookie.get('token')?.value;
    const res = await serverAxiosInstance.put(`${SHIPMENT}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    updateTag('current-shipment');
    updateTag('manager-statistics');
    return {message: res.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('error in update shipment action', error.response?.data.message);
      return {message: null, error: error.response?.data.message as string | string[]};
    }
    return {message: null, error: (error as Error).message || 'حدث خطأ ما'};
  }
};

export const DeleteShipmentAction = async (id: string) => {
  try {
    const cookie = await cookies();
    const token = cookie.get('token')?.value;
    const res = await serverAxiosInstance.delete(`${SHIPMENT}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    updateTag('current-shipment');
    updateTag('manager-statistics');
    return {message: res.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('error in delete shipment action', error.response?.data.message);
      return {message: null, error: error.response?.data.message as string | string[]};
    }
    return {message: null, error: (error as Error).message || 'حدث خطأ ما'};
  }
};

export const PauseShipmentAction = async (id: string) => {
  try {
    const cookie = await cookies();
    const token = cookie.get('token')?.value;
    const res = await serverAxiosInstance.put(
      `${SHIPMENT}/${id}/pause`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    updateTag('manager-statistics');
    updateTag('current-shipment');
    return {message: res.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('error in pause shipment action', error.response?.data.message);
      return {message: null, error: error.response?.data.message as string | string[]};
    }
    return {message: null, error: (error as Error).message || 'حدث خطأ ما'};
  }
};

export const ResumeShipmentAction = async (id: string) => {
  try {
    const cookie = await cookies();
    const token = cookie.get('token')?.value;
    const res = await serverAxiosInstance.put(
      `${SHIPMENT}/${id}/resume`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    updateTag('manager-statistics');
    updateTag('current-shipment');
    return {message: res.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('error in resume shipment action', error.response?.data.message);
      return {message: null, error: error.response?.data.message as string | string[]};
    }
    return {message: null, error: (error as Error).message || 'حدث خطأ ما'};
  }
};
