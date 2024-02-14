import { z } from 'zod';

export const CreateListingSchema = z.object({
  title: z.string().describe('등록할 숙소 제목입니다'),
  description: z.string().describe('등록할 숙소 상세내용입니다'),
  imageSrc: z.string().optional().describe('등록할 숙소 이미지 주소입니다'),
  category: z.string().describe('카테고리 값입니다'),
  roomCount: z.coerce.number().describe('방 개수 입니다'),
  bathroomCount: z.coerce.number().describe('화장실 개수입니다'),
  guestCount: z.coerce.number().describe('최대 수용 인원 수입니다'),
  price: z.coerce.number().describe('예약가격 입니다'),
});

export const SearchListingSchema = z.object({
  category: z.string().optional().describe('숙소 분류'),
  roomCount: z.coerce.number().optional().describe('방 개수 입니다'),
  bathroomCount: z.coerce.number().optional().describe('화장실 개수입니다'),
  guestCount: z.coerce.number().optional().describe('최대 수용 인원 수입니다'),
  startDate: z.coerce.date().optional().describe('예약 시작 날짜입니다'),
  endDate: z.coerce.date().optional().describe('예약 종료 날짜입니다 입니다'),
});
