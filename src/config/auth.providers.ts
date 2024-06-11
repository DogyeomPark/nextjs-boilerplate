import CredentialsProvider from 'next-auth/providers/credentials';
import type { User } from 'next-auth';

import { apiService } from '@/lib/apiService';

const providers = [
  CredentialsProvider({
    name: 'Ethereum',
    credentials: {
      message: {
        label: 'Message',
        placeholder: '0x0',
        type: 'text',
      },
      signature: {
        label: 'Signature',
        placeholder: '0x0',
        type: 'text',
      },
    },
    async authorize(credentials, request): Promise<User | null> {
      try {
        const { message, signature } = credentials;
        const resConnect = await apiService.user.userControllerSignIn({
          message: JSON.parse(message as string),
          signature: signature as string,
        });

        return {
          accessToken: resConnect.data.data.accessToken,
          refreshToken: resConnect.data.data.refreshToken,
          accessTokenExpiredAt: resConnect.data.data.accessTokenExpiredAt,
          refreshTokenExpiredAt: resConnect.data.data.refreshTokenExpiredAt,
        };
      } catch (e) {
        return null;
      }
    },
  }),
];

export default providers;
