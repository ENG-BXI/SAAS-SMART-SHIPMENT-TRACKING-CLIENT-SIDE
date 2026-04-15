'use server';
import {axiosInstance} from '@/lib/axios';
import {AUTH, LOGIN} from '@/lib/Constant/routes';
import {loginSchema} from '../_schema/login-schema';
import {cookies} from 'next/headers';
import {AxiosError} from 'axios';
import {getUser} from '@/lib/utils';

export async function loginAction(email: string, password: string) {
  const user = loginSchema.safeParse({email, password});
  let token = '';
  if (!user.success) {
    return {error: user.error.message};
  }
  const data = {
    email: user.data.email,
    password: user.data.password
  };
  const cookie = await cookies();

  try {
    const response = await axiosInstance.post(`${AUTH}/${LOGIN}`, data);
    token = response.data.data;
    cookie.set('token', token, {httpOnly: true, secure: true});
  } catch (error) {
    if (error instanceof AxiosError) {
      return {error: error.response?.data.message ?? ''};
    }
    console.error(error);
    return {error: 'Something went wrong'};
  }
  const userDecoded = getUser(token);
  if (!userDecoded) {
    cookie.delete('token');
    return {error: 'Invalid token'};
  }

  return {success: true, user: userDecoded, message: 'Login successful'};
}
