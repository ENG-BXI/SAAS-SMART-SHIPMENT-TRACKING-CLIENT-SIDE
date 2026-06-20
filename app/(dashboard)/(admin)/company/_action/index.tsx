'use server';
import serverAxiosInstance from '@/lib/axios/server';
import {COMPANY} from '@/lib/Constant/routes';
import {AxiosError} from 'axios';
import {updateTag} from 'next/cache';
import {cookies} from 'next/headers';
import {ICreateCompany, IEditCompany} from '../_interfaces/company';
export const createCompany = async (data: ICreateCompany) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  try {
    const response = await serverAxiosInstance.post(`/${COMPANY}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    updateTag('admin-statistics');
    updateTag('admin-companies');

    return {message: response.data.message, data: response.data.data, error: null};
  } catch (error) {
    if (error instanceof AxiosError) return {message: error.response?.data.message, data: null, error: error.message};
    return {message: 'حدث خطأ غير متوقع', data: null, error: error};
  }
};

export const editCompany = async (id: string, data: IEditCompany) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  try {
    const response = await serverAxiosInstance.patch(`/${COMPANY}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    updateTag('admin-statistics');
    updateTag('admin-companies');
    return {message: response.data.message, data: response.data.data, error: null};
  } catch (error) {
    if (error instanceof AxiosError) return {message: error.response?.data.message, data: null, error: error.message};
    return {message: 'حدث خطأ غير متوقع', data: null, error: error};
  }
};

export const deleteCompany = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  try {
    const response = await serverAxiosInstance.delete(`/${COMPANY}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    updateTag('admin-statistics');
    updateTag('admin-companies');

    return {message: response.data.message, data: response.data.data, error: null};
  } catch (error) {
    if (error instanceof AxiosError) return {message: error.response?.data.message, data: null, error: error.message};
    return {message: 'حدث خطأ غير متوقع', data: null, error: error};
  }
};

export async function RevalidateCompany() {
  updateTag('admin-statistics');
  updateTag('admin-companies');
}