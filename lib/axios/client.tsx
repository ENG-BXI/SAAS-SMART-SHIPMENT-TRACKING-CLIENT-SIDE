'use client';
import Cookies from 'universal-cookie';
import {baseAxiosInstance} from './base';

export const clientAxiosInstance = baseAxiosInstance;

const cookieStore = new Cookies();
clientAxiosInstance.interceptors.request.use(req => {
  const token = cookieStore.get('token');
  if (token) {
    req.headers['Authorization'] = `Bearer ${token}`;
  }
  return req;
});
