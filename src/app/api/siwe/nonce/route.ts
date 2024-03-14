import { NextRequest, NextResponse } from 'next/server';

import { apiService } from '@/lib/apiService';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const resp = await apiService.user.userControllerGetNonce();
  const nonce = resp.data.nonce;

  return NextResponse.json(
    { nonce },
    { headers: { 'Set-Cookie': resp.headers.getSetCookie()[0] } }
  );
}
