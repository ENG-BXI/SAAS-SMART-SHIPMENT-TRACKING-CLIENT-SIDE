import {enUserRoleForSaasAdmin} from '@/lib/Constant/user-role';
import {getUser} from '@/lib/utils';
import {cookies} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';

export async function sharedMiddleware(req: NextRequest) {
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
  if (user.role !== enUserRoleForSaasAdmin.ADMIN && user.role !== enUserRoleForSaasAdmin.MANAGER) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  return NextResponse.next();
}
