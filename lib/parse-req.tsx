import {NextRequest} from 'next/server';

export function parseReq(req: NextRequest) {
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? '';
  // const segments = req.nextUrl.pathname.split('/').filter(Boolean); // يشيل الفراغات
  // const hasLocale = routing.locales.includes(segments[0] as any);
  const locale = req.nextUrl.pathname.split('/')[1];
  const pathName = req.nextUrl.pathname.split('/')[2];
  const protocol = req.nextUrl.protocol;
  const subdomain = host.split(':')[0].split('.').length > 1 ? host.split(':')[0].split('.')[0] : undefined;
  const rootDomain = host.split('.')[1] ?? host.split('.')[0];
  console.log('[PROXY DEBUG]', {
    url: req.nextUrl.pathname,
    pathName,
    hasCookie: !!req.cookies.get('token')?.value
  });
  return {
    locale,
    host,
    pathName,
    protocol,
    subdomain,
    rootDomain
  };
}
