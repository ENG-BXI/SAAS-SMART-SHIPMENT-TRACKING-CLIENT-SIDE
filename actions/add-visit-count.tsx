'use server';

import serverAxiosInstance from '@/lib/axios/server';
import {ADD_VISIT, STATISTICS} from '@/lib/Constant/routes';

export async function addVisitNumber() {
  try {
    const response = await serverAxiosInstance.post(`${STATISTICS}/${ADD_VISIT}`);
    const data = response.data;
    return {data, message: 'Add Visit Count Successful', error: null};
  } catch (error) {
    return {data: null, message: 'Add Visit Count Failed', error: error?.toString()};
  }
}
