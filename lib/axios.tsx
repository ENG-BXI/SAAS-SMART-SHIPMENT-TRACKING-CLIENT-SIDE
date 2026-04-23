import axios from 'axios';
import { BASE_URL } from './Constant/routes';

export const axiosInstance = axios.create({
  baseURL: BASE_URL
});

// axiosInstance.defaults.withCredentials = true;