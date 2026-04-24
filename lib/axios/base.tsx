import axios from 'axios';
import {BASE_URL} from '../Constant/routes';

export const baseAxiosInstance = axios.create({
  baseURL: BASE_URL
});
