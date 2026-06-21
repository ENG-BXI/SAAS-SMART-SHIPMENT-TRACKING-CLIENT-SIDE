import addUserInfoIntoHeader from '@/lib/add-user-info-into-header';
import {NextRequest, NextResponse} from 'next/server';
import {baseProtectedMiddleWare} from './base-protected-middle-ware';
import {enUserRoleForSaasAdmin} from '@/lib/Constant/user-role';

export async function managerMiddleware(req: NextRequest, mySubscriptionPath: string) {
  const user = await baseProtectedMiddleWare(req);
  const path = req.nextUrl.pathname.split('/')[1];
  if (user?.role !== enUserRoleForSaasAdmin.MANAGER) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  if (user?.status == 'pending' && path != mySubscriptionPath) {
    return NextResponse.redirect(new URL('/pending', req.url));
  }
  if (user?.status == 'expired' && path != mySubscriptionPath) {
    return NextResponse.redirect(new URL('/expire', req.url));
  }
  if (user?.status == 'inactive' && path !== 'in-active' && path != mySubscriptionPath) {
    return NextResponse.redirect(new URL('/in-active', req.url));
  }
  const res = NextResponse.next();
  addUserInfoIntoHeader(res, user);
  return res;
}
