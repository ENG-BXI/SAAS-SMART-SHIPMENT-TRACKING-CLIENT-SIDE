import {routing} from '@/i18n/routing';
import {NextRequest} from 'next/server';

export function parseReq(req: NextRequest) {
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? '';
  const segments = req.nextUrl.pathname.split('/').filter(Boolean);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasLocale = routing.locales.includes(segments[0] as any);
  const locale = hasLocale ? segments[0] : 'en';
  const pathName = hasLocale ? segments[1] : segments[0];
  const protocol = req.nextUrl.protocol;
  const subdomain = host.split(':')[0].split('.').length > 1 ? host.split(':')[0].split('.')[0] : undefined;
  const rootDomain = host.split('.')[1] ?? host.split('.')[0];
  return {
    locale,
    host,
    pathName,
    protocol,
    subdomain,
    rootDomain
  };
}
