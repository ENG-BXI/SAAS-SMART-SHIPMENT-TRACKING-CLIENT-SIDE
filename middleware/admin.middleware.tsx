import addUserInfoIntoHeader from '@/lib/add-user-info-into-header';
import {enUserRoleForSaasAdmin} from '@/lib/Constant/user-role';
import {getUser} from '@/lib/utils';
import {cookies} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';

export async function adminMiddleware(req: NextRequest) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  const user = getUser(token);
  if (!user) {
    cookie.delete('token');
    return NextResponse.redirect(new URL('/login', req.url));
  }
  if (user.role !== enUserRoleForSaasAdmin.ADMIN) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  const res = NextResponse.next();
  addUserInfoIntoHeader(res, user);
  return res;
}
