import type { JWT } from 'next-auth/jwt';
import type { NextAuthConfig, Session, User } from 'next-auth';

import providers from './auth.providers';
import { apiService } from '@/lib/apiService';

const AUTH_TOKEN_BUFFER_TIME = 15;

export const authConfig = {
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
  },
  providers,
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

    async jwt({ token, user, trigger }) {
      switch (trigger) {
        case 'signIn': {
          const jwt: JWT = {
            sub: user.id ?? '',
            ...user,
          };
          return jwt;
        }

        default: {
          if (Date.now() < Number(token.accessTokenExpiredAt) * 1000) {
            return token;
          }
          const refreshed = await refreshAccessToken(token);
          return refreshed;
        }
      }
    },

    session({
      session,
      token,
    }: {
      session: Session;
      user?: User;
      token?: JWT;
    }) {
      if (token?.accessToken && token.refreshToken) {
        session.id = token.sub;

        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.accessTokenExpiredAt = token.accessTokenExpiredAt;
        session.refreshTokenExpiredAt = token.refreshTokenExpiredAt;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

const refreshAccessToken = async (token: JWT): Promise<JWT | null> => {
  try {
    if (Date.now() > Number(token.refreshTokenExpiredAt) * 1000) {
      return null;
    }

    const resp = await apiService.user.userControllerTokenRefesh({
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
    });

    if (!resp.data.data.accessTokenExpiredAt) {
      throw Error('Refresh Access Token Error');
    }

    return {
      ...token,
      accessToken: resp.data.data.accessToken,
      accessTokenExpiredAt:
        resp.data.data.accessTokenExpiredAt - AUTH_TOKEN_BUFFER_TIME,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};
