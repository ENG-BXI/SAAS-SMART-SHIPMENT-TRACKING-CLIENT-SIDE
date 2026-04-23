import {NextRequest} from 'next/server';

export function parseReq(req: NextRequest) {
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? '';
  const pathName = req.nextUrl.pathname.split('/')[1];
  const protocol = req.nextUrl.protocol;
  const subdomain = host.split(':')[0].split('.').length > 1 ? host.split(':')[0].split('.')[0] : undefined;
  const rootDomain = host.split('.')[1] ?? host.split('.')[0];
  return {
    host,
    pathName,
    protocol,
    subdomain,
    rootDomain
  };
}
