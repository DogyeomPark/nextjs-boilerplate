import { Api } from '@/generated/api/api-service';

const apiClient = new Api({ baseUrl: process.env.NEXT_API_URL });

export default apiClient;
