import { Api } from '@/generated/api/api-service';

export const apiService = new Api({
  baseUrl: process.env.BASE_API_URL,
});
