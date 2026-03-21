if (!process.env.NEXT_PUBLIC_BASE_URL) throw new Error('Base Url Not Found In .Env');
export const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const BASE_URL = BACKEND_URL + '/api/v1';
export const COMPANY = 'company';
