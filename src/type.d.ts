import { User } from 'next-auth';

type UserId = string;
declare module 'next-auth/jwt' {
  interface JWT {
    sub: UserId;
    iat: number;
    exp: number;
    jti: string;
    name: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiredAt: number;
    refreshTokenExpiredAt: number;
    provider: string;
    idToken: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      sub: UserId;
      iat: number;
      exp: number;
      jti: string;
      name: string;
      accessToken: string;
      refreshToken: string;
      accessTokenExpiredAt: number;
      refreshTokenExpiredAt: number;
    };
  }
}
