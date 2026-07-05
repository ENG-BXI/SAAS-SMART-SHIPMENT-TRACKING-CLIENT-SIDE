import addUserInfoIntoHeader from '@/lib/add-user-info-into-header';
import {enUserRoleForSaasAdmin} from '@/lib/Constant/user-role';
import {NextRequest, NextResponse} from 'next/server';
import {baseProtectedMiddleWare} from './base-protected-middle-ware';

export async function admin_manager__employee_sharedMiddleware(req: NextRequest) {
  const user = await baseProtectedMiddleWare(req);
  if (user?.role !== enUserRoleForSaasAdmin.ADMIN && user?.role !== enUserRoleForSaasAdmin.MANAGER && user?.role !== enUserRoleForSaasAdmin.EMPLOYEE) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  if (user.status == 'pending') {
    return NextResponse.redirect(new URL(`/pending`, req.url));
  }
  if (user.status == 'expired') {
    return NextResponse.redirect(new URL(`/expire`, req.url));
  }
  if (user.status == 'inactive' && user.role != 'admin') {
    return NextResponse.redirect(new URL(`/in-active`, req.url));
  }
  const res = NextResponse.next();
  addUserInfoIntoHeader(res, user);
  return res;
}
