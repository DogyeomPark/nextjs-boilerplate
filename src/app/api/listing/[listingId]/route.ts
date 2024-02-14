import axios from 'axios';
import { NextResponse } from 'next/server';

import { apiService } from '@/lib/apiService';

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { listingId } = params;
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  //
  await apiService.listing.listingControllerRemove(listingId);
  return NextResponse.json({}, { status: 200 });
}
