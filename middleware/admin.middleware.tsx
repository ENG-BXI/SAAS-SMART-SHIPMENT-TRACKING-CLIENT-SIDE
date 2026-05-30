import addUserInfoIntoHeader from '@/lib/add-user-info-into-header';
import {enUserRoleForSaasAdmin} from '@/lib/Constant/user-role';
import {NextRequest, NextResponse} from 'next/server';
import {baseProtectedMiddleWare} from './base-protected-middle-ware';

export async function adminMiddleware(req: NextRequest) {
  const user = await baseProtectedMiddleWare(req);
  if (user?.role !== enUserRoleForSaasAdmin.ADMIN) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  const res = NextResponse.next();
  addUserInfoIntoHeader(res, user);
  return res;
}
