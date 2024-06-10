import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { apiService } from '@/lib/apiService';
import { AUTH_TOKEN_KEY, SESSION_ID_KEY } from '@/config';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { message, signature } = body;

  const resp = await apiService.user.userControllerSignIn(
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

  const { accessToken } = resp.data.data;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  cookies().set(AUTH_TOKEN_KEY, accessToken, {
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  return NextResponse.json({}, { status: 201 });
}
