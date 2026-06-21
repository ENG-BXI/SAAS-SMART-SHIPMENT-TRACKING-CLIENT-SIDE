'use server';

import {USER} from '@/lib/Constant/routes';
import serverAxiosInstance from '@/lib/axios/server';
import {createUserFormData, editUserFormData} from '../_schemas/user-schema';
import {cookies} from 'next/headers';
import {updateTag} from 'next/cache';
import {AxiosError} from 'axios';

export async function CreateUser(data: createUserFormData) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    const response = await serverAxiosInstance.post(USER, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    updateTag('all-users');
    return {data: response.data, message: response.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) return {data: null, message: error.response?.data.message, error: error.message};

    return {data: null, message: (error as Error).message || 'حدث خطأ ما', error: error?.toString()};
  }
}

export async function UpdateUser(id: string, data: editUserFormData) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    const response = await serverAxiosInstance.put(`${USER}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    updateTag('all-users');

    return {data: response.data, message: response.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) {
      return {data: null, message: error.response?.data.message, error: error.message};
    }
    return {data: null, message: (error as Error).message || 'حدث خطأ ما', error: error?.toString()};
  }
}

export async function DeleteUser(id: string) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    const response = await serverAxiosInstance.delete(`${USER}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    updateTag('all-users');

    return {data: response.data, message: response.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) {
      return {data: null, message: error.response?.data.message, error: error.message};
    }
    return {data: null, message: (error as Error).message || 'حدث خطأ ما', error: error?.toString()};
  }
}
export async function RevalidateUser() {
  updateTag('all-users');
}