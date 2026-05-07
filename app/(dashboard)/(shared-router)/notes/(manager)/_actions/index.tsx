'use server';

import {NOTE} from '@/lib/Constant/routes';
import serverAxiosInstance from '@/lib/axios/server';
import {noteFormData} from '../_schemas/note-schema';
import {cookies} from 'next/headers';
import {updateTag} from 'next/cache';
import {AxiosError} from 'axios';

export async function CreateNote(data: noteFormData) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    const response = await serverAxiosInstance.post(`${NOTE}`, data, {
      headers: {Authorization: `Bearer ${token}`}
    });
    updateTag('all-note');
    return {data: response.data.data, message: response.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) return {data: null, message: error.response?.data.message, error: error.message};
    return {data: null, message: 'حدث خطا', error: error?.toString()};
  }
}
export async function UpdateNote(id: string, data: noteFormData) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    const response = await serverAxiosInstance.put(`${NOTE}/${id}`, data, {
      headers: {Authorization: `Bearer ${token}`}
    });
    updateTag('all-note');
    return {data: response.data.data, message: response.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) return {data: null, message: error.response?.data.message, error: error.message};
    return {data: null, message: 'حدث خطا', error: error?.toString()};
  }
}
export async function DeleteNote(id: string) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  try {
    const response = await serverAxiosInstance.delete(`${NOTE}/${id}`, {
      headers: {Authorization: `Bearer ${token}`}
    });
    updateTag('all-note');
    return {data: response.data.data, message: response.data.message, error: null};
  } catch (error) {
    if (error instanceof AxiosError) return {data: null, message: error.response?.data.message, error: error.message};
    return {data: null, message: 'حدث خطا', error: error?.toString()};
  }
}
