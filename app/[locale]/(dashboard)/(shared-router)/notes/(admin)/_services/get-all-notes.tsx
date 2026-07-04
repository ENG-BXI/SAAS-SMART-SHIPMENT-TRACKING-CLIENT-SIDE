import {IResponseWithPagination} from '@/Interfaces/IResponse-with-pagination';
import {NOTE_TYPE_TYPE} from '@/lib/Constant/note-type';
import {NOTE} from '@/lib/Constant/routes';
import serverAxiosInstance from '@/lib/axios/server';
import {cacheLife, cacheTag} from 'next/cache';
interface INote {
  id: string;
  type: NOTE_TYPE_TYPE;
  text: string;
  createdAt: string;
}
const GetAllNotes = async (token?: string, search?: string, page?: string) => {
  'use cache';
  cacheTag('all-note');
  cacheLife('days');
  const response = await serverAxiosInstance.get(`${NOTE}/`, {
    params: {search, page},
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = response.data.data as IResponseWithPagination<INote>;
  return data;
};

export default GetAllNotes;
