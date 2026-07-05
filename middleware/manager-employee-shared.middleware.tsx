import addUserInfoIntoHeader from '@/lib/add-user-info-into-header';
import {enUserRoleForSaasAdmin} from '@/lib/Constant/user-role';
import {NextRequest, NextResponse} from 'next/server';
import {baseProtectedMiddleWare} from './base-protected-middle-ware';
import {parseReq} from '@/lib/parse-req';
import createMiddleware from 'next-intl/middleware';
import {routing} from '@/i18n/routing';

export async function manager_employee_sharedMiddleware(req: NextRequest) {
  const user = await baseProtectedMiddleWare(req);
  const {locale} = parseReq(req);
  if (user?.role !== enUserRoleForSaasAdmin.MANAGER && user?.role !== enUserRoleForSaasAdmin.EMPLOYEE) {
    return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
  }
  if (user.status == 'pending') {
    return NextResponse.redirect(new URL(`/${locale}/pending`, req.url));
  }
  if (user.status == 'expired') {
    return NextResponse.redirect(new URL(`/${locale}/expire`, req.url));
  }
  if (user.status == 'inactive') {
    return NextResponse.redirect(new URL(`/${locale}/in-active`, req.url));
  }
  const res = NextResponse.next();
  const intlMiddleware = createMiddleware(routing);
  const responseI18 = intlMiddleware(req);

  addUserInfoIntoHeader(res, user);
  return res;
}
