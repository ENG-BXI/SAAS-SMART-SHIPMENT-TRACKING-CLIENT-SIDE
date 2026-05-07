import {IResponseWithPagination} from '@/Interfaces/IResponse-with-pagination';
import {USER} from '@/lib/Constant/routes';
import {UserRole} from '@/lib/Constant/user-role';
import serverAxiosInstance from '@/lib/axios/server';
import {cacheLife, cacheTag} from 'next/cache';
interface IUser {
  id: string;
  userName: string;
  email: string;
  role: UserRole;
}
export async function GetAllUsers(token?: string, search?: string, page?: string) {
  'use cache';
  cacheLife('days');
  cacheTag('all-users');
  const response = await serverAxiosInstance.get(`${USER}`, {
    params: {search, page},
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = response.data.data as IResponseWithPagination<IUser>;
  console.log(data);

  return data;
}
