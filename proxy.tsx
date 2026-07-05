import {NextRequest, NextResponse, ProxyConfig} from 'next/server';
import {adminMiddleware} from './middleware/admin.middleware';
import {managerMiddleware} from './middleware/manager.middleware';
import {parseReq} from './lib/parse-req';
import {publicMiddleware} from './middleware/public.middleware';
import {manager_employee_sharedMiddleware} from './middleware/manager-employee-shared.middleware';
import {admin_manager__employee_sharedMiddleware} from './middleware/admin-manager-employee-shared.middleware';
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
const publicRoute = ['', 'login'];
const adminRoute = ['company', 'subscription', 'subscription-request'];
const managerRoute = ['my-subscription', 'users'];
const manager_employee_sharedRoute = ['shipments', 'clients', 'ways', 'settings'];
// const admin_manager_sharedRoute = [];
const admin_manager_employee_SharedRoute = ['statistics', 'notes'];

const intlMiddleware = createMiddleware(routing);
export default async function Proxy(req: NextRequest) {
  const {pathName} = parseReq(req);
  let response: NextResponse | undefined;
  const responseI18 = intlMiddleware(req);
  if (adminRoute.includes(pathName)) {
    response = await adminMiddleware(req);
  }
  if (managerRoute.includes(pathName)) {
    response = await managerMiddleware(req, 'my-subscription');
  }
  if (manager_employee_sharedRoute.includes(pathName)) {
    response = await manager_employee_sharedMiddleware(req);
  }
  // if (admin_manager_sharedRoute.includes(pathName)) {
  //   return admin_manager_sharedMiddleware(req);
  // }
  if (admin_manager_employee_SharedRoute.includes(pathName)) {
    response = await admin_manager__employee_sharedMiddleware(req);
  }
  if (publicRoute.includes(pathName)) {
   response = await publicMiddleware(req);
  }
  if (!response) {
    return responseI18;
  }
  if (responseI18.headers.get('location')) {
    return responseI18;
  }
  responseI18.headers.forEach((value, key) => {
    response!.headers.set(key, value);
  });

  return response;
}

export const config: ProxyConfig = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
