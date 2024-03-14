import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { apiService } from '@/lib/apiService';
import { AUTH_TOKEN_KEY, SESSION_ID_KEY } from '@/config';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { message, signature } = body;

  const resp = await apiService.wallet.walletControllerSignIn(
    {
      message,
      signature,
    },
    {
      headers: {
        Cookie: `${SESSION_ID_KEY}=${cookies().get(SESSION_ID_KEY)?.value}`,
      },
    },
  );

  if (resp.status !== 201) {
    return NextResponse.error();
  }

  const { accessToken } = resp.data;

  // TODO: {expires} 혹은 {maxAge}를 통한 만료기간에 관한 설정이 필요합니다.
  cookies().set(AUTH_TOKEN_KEY, accessToken, {
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    // maxAge or expires:
  });

  return NextResponse.json({}, { status: 201 });
}
