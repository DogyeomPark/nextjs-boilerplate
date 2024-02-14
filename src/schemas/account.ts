import { z } from 'zod';

export const SignupSchema = z.object({
  email: z.string().email().describe('이메일 주소입니다'),
  name: z.string().describe('유저 설정 이름입니다'),
  password: z
    .string({
      required_error: '비밀번호를 입력해주세요',
    })
    .min(1, '비밀번호를 입력해주세요')
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .max(32, '비밀번호는 32자를 넘을 수 없습니다')
    .regex(
      new RegExp('.*[A-Z].*'),
      '하나 이상의 대문자가 반드시 포함되어야 합니다'
    )
    .regex(
      new RegExp('.*[a-z].*'),
      '하나 이상의 소문자가 반드시 포함되어야 합니다'
    )
    .regex(new RegExp('.*\\d.*'), '하나 이상의 숫자가 반드시 포함되어야 합니다')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      '하나 이상의 특수문자가 반드시 포함되어야 합니다'
    )
    .describe('인증을 위한 비밀번호입니다'),
});

export const SigninSchema = z.object({
  email: z.string().email().describe('이메일 주소입니다'),
  password: z
    .string({
      required_error: '비밀번호를 입력해주세요',
    })
    .min(1, '비밀번호를 입력해주세요')
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .max(32, '비밀번호는 32자를 넘을 수 없습니다')
    .regex(
      new RegExp('.*[A-Z].*'),
      '하나 이상의 대문자가 반드시 포함되어야 합니다'
    )
    .regex(
      new RegExp('.*[a-z].*'),
      '하나 이상의 소문자가 반드시 포함되어야 합니다'
    )
    .regex(new RegExp('.*\\d.*'), '하나 이상의 숫자가 반드시 포함되어야 합니다')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      '하나 이상의 특수문자가 반드시 포함되어야 합니다'
    )
    .describe('인증을 위한 비밀번호입니다'),
});
