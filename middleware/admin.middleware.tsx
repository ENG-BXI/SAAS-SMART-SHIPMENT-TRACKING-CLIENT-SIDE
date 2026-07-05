import addUserInfoIntoHeader from '@/lib/add-user-info-into-header';
import {enUserRoleForSaasAdmin} from '@/lib/Constant/user-role';
import {NextRequest, NextResponse} from 'next/server';
import {baseProtectedMiddleWare} from './base-protected-middle-ware';
import {parseReq} from '@/lib/parse-req';

export async function adminMiddleware(req: NextRequest) {
  const user = await baseProtectedMiddleWare(req);
  const {locale} = parseReq(req);
  if (user?.role !== enUserRoleForSaasAdmin.ADMIN) {
    return NextResponse.redirect(new URL(`${locale}/unauthorized`, req.url));
  }
  const res = NextResponse.next();
  addUserInfoIntoHeader(res, user);
  return res;
}
