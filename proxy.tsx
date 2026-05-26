import {NextRequest, ProxyConfig} from 'next/server';
import {adminMiddleware} from './middleware/admin.middleware';
import {managerMiddleware} from './middleware/manager.middleware';
import {parseReq} from './lib/parse-req';
import {publicMiddleware} from './middleware/public.middleware';
import {manager_employee_sharedMiddleware} from './middleware/manager-employee-shared.middleware';
import {admin_manager__employee_sharedMiddleware} from './middleware/admin-manager-employee-shared.middleware';
const publicRoute = ['', 'login'];
const adminRoute = ['company', 'subscription'];
const managerRoute = ['my-subscription', 'users'];
const manager_employee_sharedRoute = ['shipments', 'clients', 'ways', 'settings'];
// const admin_manager_sharedRoute = [];
const admin_manager_employee_SharedRoute = ['statistics', 'notes'];
export default async function Proxy(req: NextRequest) {
  const {pathName} = parseReq(req);
  if (adminRoute.includes(pathName)) {
    return adminMiddleware(req);
  }
  if (managerRoute.includes(pathName)) {
    return managerMiddleware(req);
  }
  if (manager_employee_sharedRoute.includes(pathName)) {
    return manager_employee_sharedMiddleware(req);
  }
  // if (admin_manager_sharedRoute.includes(pathName)) {
  //   return admin_manager_sharedMiddleware(req);
  // }
  if (admin_manager_employee_SharedRoute.includes(pathName)) {
    return admin_manager__employee_sharedMiddleware(req);
  }
  if (publicRoute.includes(pathName)) {
    return publicMiddleware(req);
  }
}

export const config: ProxyConfig = {
  matcher: ['/', '/login', '/company/:path*', '/unauthorized', '/subscription/:path*', '/my-subscription/:path*', '/users/:path*', '/shipments/:path*', '/clients/:path*', '/ways/:path*', '/settings/:path*', '/statistics/:path*', '/notes/:path*']
};
