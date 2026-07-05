import {getUser} from '@/lib/utils';
import {cookies} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';

export async function baseProtectedMiddleWare(req: NextRequest) {
  const cookie = await cookies();
  const token = req.cookies.get('token')?.value;
  if (!token) {
    NextResponse.redirect(new URL('/unauthorized', req.url));
    return null;
  }
  const user = getUser(token);
  console.log('====================================');
  console.log('[USER IN BASE MIDDLEWARE]', user);
  console.log('====================================');
  if (!user) {
    cookie.delete('token');
    NextResponse.redirect(new URL('/login', req.url));
    return null;
  }

  return user;
}
