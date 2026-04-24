import {baseAxiosInstance} from './base';

const serverAxiosInstance = baseAxiosInstance;

export default serverAxiosInstance;

// We Have a Issus with Next js Caching
/*
Route /shipments used `cookies()` inside "use cache". 
Accessing Dynamic data sources inside a cache scope is not supported. 
If you need this data inside a cached function use `cookies()` outside of the cached function and pass the required dynamic data in as an argument. 
See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache
*/

// serverAxiosInstance.interceptors.request.use(async req => {
//   const cookieStore = await cookies();
//   const token = cookieStore.get('token')?.value;
//   if (token) {
//     req.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return req;
// });
