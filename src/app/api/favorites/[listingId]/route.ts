import { NextResponse } from 'next/server';

import getCurrentUser from '@/actions/getCurrentUser';
import { apiService } from '@/lib/apiService';

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  //
  const { listingId } = params;
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  //
  await apiService.favorite.favoriteControllerAdd(listingId);
  return NextResponse.json({}, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  //
  const { listingId } = params;
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  //
  await apiService.favorite.favoriteControllerRemove(listingId);
  return NextResponse.json({}, { status: 200 });
}
