import { z } from 'zod';

export const SearchReservationSchema = z.object({
  listingId: z.string().describe('예약할 item id 입니다'),
  userId: z.string().describe('숙소 등록자 id 입니다.'),
  authorId: z.string().describe('예약할 item id 입니다'),
});
