import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { apiService } from '@/lib/apiService';

export async function POST(request: NextRequest) {
  const session = await auth();

  await apiService.user.userControllerSignOut({
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  });

  return NextResponse.json({}, { status: 200 });
}
