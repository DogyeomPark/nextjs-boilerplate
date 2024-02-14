import { z } from 'zod';

export const ReserveSchema = z.object({
  listingId: z.string().describe('예약할 item id 입니다'),
  startDate: z.coerce.date().describe('예약 시작 날짜입니다'),
  endDate: z.coerce.date().describe('예약 종료 날짜입니다 입니다'),
  totalPrice: z.coerce.number().describe('예약 비용입니다'),
});
