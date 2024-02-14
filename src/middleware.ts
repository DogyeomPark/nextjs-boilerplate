// export { auth as middleware } from '@/auth';

import { NextRequest } from 'next/server';
import { i18nRouter } from 'next-i18n-router';

// import { auth } from '@/auth';
import i18nConfig from '../i18n.config';

export async function middleware(req: NextRequest) {
  return i18nRouter(req, i18nConfig);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)']
};
