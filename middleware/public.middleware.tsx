import {parseReq} from '@/lib/parse-req';
import {getUser} from '@/lib/utils';
import {cookies} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';

export async function publicMiddleware(req: NextRequest) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const {pathName} = parseReq(req);
  if (token) {
    const user = getUser(token);
    if (user) {
      const res = NextResponse.next();
      res.headers.append('user-companyId', user.companyId);
      res.headers.append('user-email', user.email);
      res.headers.append('user-role', user.role);
      res.headers.append('user-id', user.id);
      if (pathName == 'login') return NextResponse.redirect(new URL('/statistics', req.url));
      else return res;
    }
  }
  return NextResponse.next();
}
