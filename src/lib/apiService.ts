import { Api } from '@/generated/api/api-service';

export const apiService = new Api({
  baseUrl: process.env.NEXT_API_URL,
});
