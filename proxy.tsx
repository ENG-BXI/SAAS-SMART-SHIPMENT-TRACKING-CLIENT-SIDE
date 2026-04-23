import {NextRequest, ProxyConfig} from 'next/server';
import {adminMiddleware} from './middleware/admin.middleware';
import {managerMiddleware} from './middleware/manager.middleware';
import {parseReq} from './lib/parse-req';
import {publicMiddleware} from './middleware/public.middleware';
import {sharedMiddleware} from './middleware/shared.middleware';
const publicRoute = ['', 'login'];
const adminRoute = ['company', 'subscription', 'users'];
const managerRoute = ['shipments', 'clients', 'ways', 'settings'];
const sharedRoute = ['statistics', 'notes'];
export default async function Proxy(req: NextRequest) {
  const {pathName} = parseReq(req);
  if (adminRoute.includes(pathName)) {
    return adminMiddleware(req);
  }
  if (managerRoute.includes(pathName)) {
    return managerMiddleware(req);
  }
  if (sharedRoute.includes(pathName)) {
    return sharedMiddleware(req);
  }
  if (publicRoute.includes(pathName)) {
    return publicMiddleware(req);
  }
}

export const config: ProxyConfig = {
  matcher: ['/', '/login', '/company/:path*', '/unauthorized', '/subscription/:path*', '/users/:path*', '/shipments/:path*', '/clients/:path*', '/ways/:path*', '/settings/:path*', '/statistics/:path*', '/notes/:path*']
};
