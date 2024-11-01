import { DefaultSession } from 'next-auth';

export interface Todo {
  id: number;
  value: string;
  done: boolean;
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpiredAt: number | null;
    refreshTokenExpiredAt: number | null;
  }
}

declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiredAt: number | null;
    refreshTokenExpiredAt: number | null;
  }

  interface Session extends DefaultSession, User {}
}
