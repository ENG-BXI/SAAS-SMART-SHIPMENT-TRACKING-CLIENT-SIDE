import addUserInfoIntoHeader from '@/lib/add-user-info-into-header';
import {parseReq} from '@/lib/parse-req';
import {getUser} from '@/lib/utils';
import {NextRequest, NextResponse} from 'next/server';

export async function publicMiddleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  console.log('====================================');
  console.log(token);
  console.log('====================================');
  const {pathName} = parseReq(req);
  if (token) {
    const user = getUser(token);
    if (user) {
      const res = NextResponse.next();
      addUserInfoIntoHeader(res, user);
      if (pathName == 'login') return NextResponse.redirect(new URL('/statistics', req.url));
      else return res;
    }
  }
  return NextResponse.next();
}
