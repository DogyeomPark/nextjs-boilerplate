import axios from 'axios';
import { NextResponse } from 'next/server';

import { SignupSchema } from '@/schemas/account';
import { apiService } from '@/lib/apiService';

// zod validation 을 api route 로 옮겨서 api 에 대한 로직을 component 와 분리하도록 합니다
// zod를 react-use-form 의 resolver 로 등록하여 사용해도 괜찮습니다.
// 하지만 api 소통을 위한 검증이 form 라이브러리와 너무 깊은 종속성이 생기게 되어 조금 고민 중입니다.

// signin 과 달리 signup 에서는 zod 활용하여 필드 값을 검증합니다
// signup 단계에서 각 필드가 규칙을 따르고 있는지 매번 서버에 요청하는 것은 비효율적이기 때문입니다
export async function POST(request: Request) {
  const body = await request.json();

  // If the request body is invalid, return a 400 error with the validation errors
  const schemaTest = SignupSchema.safeParse(body);
  if (!schemaTest.success) {
    const { errors } = schemaTest.error;
    return NextResponse.json(
      {
        errors: errors,
      },
      { status: 400 }
    );
  }

  //
  const response = await apiService.user.userControllerSignUp(body);
  return NextResponse.json(
    {
      user: response.data,
    },
    { status: 200 }
  );
}
