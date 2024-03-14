import { User } from 'next-auth';

// jwt 와 Session 타입을 오버라이드하여 타입 검증을 할 수 있게 됩니다.
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

// declare module '@auth/core/types' {
//   interface Session {
//     error?: 'RefreshAccessTokenError';
//     user: SafeUser & {
//       sub: UserId;
//       iat: number;
//       exp: number;
//       jti: string;
//       name: string;
//       accessToken: string;
//     };
//   }
// }

// declare module '@auth/core/jwt' {
//   interface JWT {
//     sub: UserId;
//     iat: number;
//     exp: number;
//     jti: string;
//     name: string;
//     accessToken: string;
//   }
// }
