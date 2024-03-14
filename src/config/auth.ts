export const AUTH_TOKEN_KEY = 'accessToken';

export const SESSION_ID_KEY = 'connect.sid';

// interface of auth token should be here
export interface AuthToken {
  id: number;
  walletAddress: string;
  iat: number;
  exp: number;
}
