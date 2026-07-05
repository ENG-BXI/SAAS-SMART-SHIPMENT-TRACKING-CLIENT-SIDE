import addUserInfoIntoHeader from '@/lib/add-user-info-into-header';
import {parseReq} from '@/lib/parse-req';
import {getUser} from '@/lib/utils';
import {NextRequest, NextResponse} from 'next/server';

export async function publicMiddleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const {pathName, locale} = parseReq(req);
  console.log('[PUBLIC MIDDLEWARE DEBUG]', {pathName, token: !!token});
  if (token) {
    const user = getUser(token);
    console.log('====================================');
    console.log('[USER]', user);
    console.log('====================================');
    if (user) {
      const res = NextResponse.next();
      addUserInfoIntoHeader(res, user);
      if (pathName == 'login') {
        console.log('[REDIRECT TO STATSTICS]', req.url);
        return NextResponse.redirect(new URL(`/${locale}/statistics`, req.url));
      } else {
        return res;
      }
    }
  }
  return NextResponse.next();
}
