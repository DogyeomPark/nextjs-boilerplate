import NextAuth from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { NextAuthConfig, Session, User } from 'next-auth';

// const adapter = PrismaAdapter(client);

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

    // 별도의 비지니스 로직을 추가할 수 있습니다.
    // 현재는 별다른 이슈가 없기 때문에 true 를 반환합니다.
    // 다음과 같이 특정 email 만을 거를 수도 있겠습니다.
    // return profile?.email?.endsWith("@memecore.org")
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
      // trigger 종류에 따라서 전달받는 데이터의 내용이 다릅니다.
      // 따라서 다음과 같이 trigger 에 따라 어디서 데이터를 가져올 것인지를 설정합니다.

      const accountRecord = account as Record<string, any>;
      switch (trigger) {
        // * - user sign-in:x
        // First time the callback is invoked,
        // `user`, `profile`, `account` 데이터를 사용할 수 있습니다.
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
        case 'update':
          const updateToken = {
            ...token,
            name: session.user.name,
          };
          if (Date.now() < updateToken.accessTokenExpiredAt) return updateToken;
          return updateToken; // TODO: 필요할 경우 accessToken을 refresh하는 로직 추가

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
        session.user.id = token.sub as string;
        session.user.name = token.name;
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

// NOTE:
// beta4 에서는 update 였으나 beta5 로 업데이트되면서 unstable_update 로 변경되었습니다.
// 추후 함수가 변경될 가능성이 있습니다.
// 정식 버전으로 편입될 때 확인이 필요합니다.
export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL,
  // adapter: adapter, // prisma 등 원하는 adapter 를 사용하도록 지정 가능합니다. full stack web app 을 만드는게 아닌 경우 backend api 를 통해서 db 와 소통하길 권장합니다.
  session: { strategy: 'jwt' }, // db session 방식이 아닌 JSON Web Token 방식 방식으로 관리합니다.
  debug: process.env.NODE_ENV !== 'production', // production 단계가 아니라면 next-auth 의 debug log 를 활성화시킵니다.
  ...config,
});
