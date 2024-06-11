import NextAuth from 'next-auth';

import { authConfig } from './config';

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL,
  session: { strategy: 'jwt' },
  debug: process.env.NODE_ENV !== 'production',
  ...authConfig,
});
