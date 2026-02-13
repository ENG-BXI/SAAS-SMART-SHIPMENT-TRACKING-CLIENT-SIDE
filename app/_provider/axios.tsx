import axios from 'axios';
import {BASE_URL} from '../_constant/routes';

export const axiosInstance = axios.create({
  baseURL: BASE_URL
});
