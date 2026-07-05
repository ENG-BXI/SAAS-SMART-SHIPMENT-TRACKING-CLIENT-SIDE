import addUserInfoIntoHeader from '@/lib/add-user-info-into-header';
import {NextRequest, NextResponse} from 'next/server';
import {baseProtectedMiddleWare} from './base-protected-middle-ware';
import {enUserRoleForSaasAdmin} from '@/lib/Constant/user-role';
import {parseReq} from '@/lib/parse-req';

export async function managerMiddleware(req: NextRequest, mySubscriptionPath: string) {
  const user = await baseProtectedMiddleWare(req);
  const {pathName} = parseReq(req);
  if (user?.role !== enUserRoleForSaasAdmin.MANAGER) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  if (user?.status == 'pending' && pathName != mySubscriptionPath) {
    return NextResponse.redirect(new URL(`/pending`, req.url));
  }
  if (user?.status == 'expired' && pathName != mySubscriptionPath) {
    return NextResponse.redirect(new URL(`/expire`, req.url));
  }
  if (user?.status == 'inactive' && pathName !== 'in-active' && pathName != mySubscriptionPath) {
    return NextResponse.redirect(new URL(`/in-active`, req.url));
  }
  const res = NextResponse.next();
  addUserInfoIntoHeader(res, user);
  return res;
}
