import { Api } from '@/generated/api/api-service';

export const apiService = new Api({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  baseApiParams: {
    credentials: 'include',
  },
});
