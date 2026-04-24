import {IUser} from '@/Interfaces/IUser';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const getMe = async () => {
  const res = await axios.get('/api/me');
  return res.data.data as IUser;
};

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe
  });
};
