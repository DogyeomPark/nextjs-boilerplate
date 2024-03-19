import { NextRequest, NextResponse } from 'next/server';

import { apiService } from '@/lib/apiService';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const resp = await apiService.wallet.userControllerGetNonce();
  const nonce = resp.data.nonce;

  const cookie = resp.headers.get('set-cookie');

  if (!cookie) {
    return NextResponse.error();
  }

  return NextResponse.json({ nonce }, { headers: { 'Set-Cookie': cookie } });
}
