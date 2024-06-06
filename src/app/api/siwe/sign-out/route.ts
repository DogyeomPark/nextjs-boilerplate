import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { apiService } from '@/lib/apiService';
import { AUTH_TOKEN_KEY } from '@/config';

export async function POST(request: NextRequest) {
  await apiService.user.userControllerSignOut({
    headers: { Cookie: cookies().toString() },
  });
  cookies().delete(AUTH_TOKEN_KEY);
  return NextResponse.json({}, { status: 200 });
}
