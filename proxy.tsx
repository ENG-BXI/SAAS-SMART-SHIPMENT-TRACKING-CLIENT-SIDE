import {cookies} from 'next/headers';
import {NextRequest, NextResponse, ProxyConfig} from 'next/server';
import {getUser} from './lib/utils';
const publicRoute = ['login'];
const privateRoute = ['admin', 'manager', 'driver', 'customer'];
export default async function Proxy(req: NextRequest) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const pathName = req.nextUrl.pathname.split('/')[1];
  if (privateRoute.includes(pathName)) {
    if (!token) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    const user = getUser(token);
    if (!user) {
      cookie.delete('token');
      return NextResponse.redirect(new URL('/login', req.url));
    }
    if (user.role !== pathName) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    return NextResponse.next();
  }
  if (publicRoute.includes(pathName)) {
    if (token) {
      const user = getUser(token);
      if (user) {
        if (user.role == 'admin') {
          return NextResponse.redirect(new URL('/admin', req.url));
        }
        if (user.role == 'manager') {
          return NextResponse.redirect(new URL('/manager', req.url));
        }
        if (user.role == 'driver') {
          return NextResponse.redirect(new URL('/driver', req.url));
        }
        // if (user.role == 'customer') {
        //   return NextResponse.redirect(new URL('/customer', req.url));
        // }
      }
    }
    return NextResponse.next();
  }
}

export const config: ProxyConfig = {
  matcher: ['/login', '/admin/:path*', '/manager/:path*']
};
