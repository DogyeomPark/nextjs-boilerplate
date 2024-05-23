import NextAuth from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { NextAuthConfig, Session, User } from 'next-auth';

export const config = {
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
  },
  providers: [],
  callbacks: {
    redirect({ url, baseUrl }) {
      const redirectUrl = url.startsWith('/')
        ? new URL(url, baseUrl).toString()
        : url;
      return redirectUrl;
    },

    async authorized({ request, auth }) {
      return true;
    },

    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    // This callback is called whenever a JSON Web Token is created (i.e. at sign in)
    // or updated (i.e whenever a session is accessed in the client).
    //
    // Its content is forwarded to the `session` callback,
    // where you can control what should be returned to the client.
    // Anything else will be kept from your front-end.
    //
    // The JWT is encrypted by default.
    //
    // [Documentation](https://next-auth.js.org/configuration/callbacks#jwt-callback) |
    // [`session` callback](https://next-auth.js.org/configuration/callbacks#session-callback)
    async jwt({ token, user, account, profile, trigger, session }) {
      const accountRecord = account as Record<string, any>;
      switch (trigger) {
        // * - user sign-in:x
        // First time the callback is invoked,
        case 'signIn':
          return {
            ...token,
            accessToken: accountRecord.access_token,
            refreshToken: accountRecord.refresh_token,
            accessTokenExpiredAt:
              Date.now() + (accountRecord.expires_in - 15) * 1000,
            refreshTokenExpiredAt:
              Date.now() + (accountRecord.refresh_expires_in - 15) * 1000,
          };
        // * - user sign-up:
        // a user is created for the first time in the database(when {@link AuthConfig.session}.strategy is set to `"database"`)
        case 'signUp':
          return {
            ...token,
            accessToken: accountRecord.access_token,
            refreshToken: accountRecord.refresh_token,
            accessTokenExpiredAt:
              Date.now() + (accountRecord.expires_in - 15) * 1000,
            refreshTokenExpiredAt:
              Date.now() + (accountRecord.refresh_expires_in - 15) * 1000,
          };
        // * - update event:
        // Triggered by the[`useSession().update`](https:;//next-auth.js.org/getting-started/client#update-session) method.
        case 'update': {
          const updateToken = {
            ...token,
            name: session.user.name,
          };
          if (Date.now() < updateToken.accessTokenExpiredAt) return updateToken;
          return updateToken; // TODO: 필요할 경우 accessToken을 refresh하는 로직 추가
        }

        // * In case of the latter, `trigger` will be `undefined`.
        default:
          if (Date.now() < token.accessTokenExpiredAt) return token;
          return token; // TODO: 필요할 경우 accessToken을 refresh하는 로직 추가
      }
    },

    // This callback is called whenever a session is checked.
    // (Eg.: invoking the `/api/session` endpoint, using `useSession` or `getSession`)
    //
    // ⚠ By default, only a subset (email, name, image) of the token is returned for increased security.
    // If you want to make something available you added to the token through the `jwt` callback,
    // you have to explicitly forward it here to make it available to the client.
    //
    // @see [`jwt` callback](https://authjs.dev/reference/core/types#jwt)
    // session({ session, token }) {
    session({
      session,
      token,
    }: {
      session: Session;
      user?: User;
      token?: JWT;
    }) {
      if (token) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL,
  session: { strategy: 'jwt' },
  debug: process.env.NODE_ENV !== 'production',
  ...config,
});
