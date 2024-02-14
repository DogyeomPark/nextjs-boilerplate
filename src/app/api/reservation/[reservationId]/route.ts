import axios from 'axios';
import { NextResponse } from 'next/server';

import getCurrentUser from '@/actions/getCurrentUser';
import { apiService } from '@/lib/apiService';

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;
  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  const reservation = await apiService.reservation
    .reservationControllerRemove(reservationId)
    .then((res) => res.data);

  return NextResponse.json(reservation);
}
