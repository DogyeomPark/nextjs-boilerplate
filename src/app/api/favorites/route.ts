import { NextResponse } from 'next/server';

import { apiService } from '@/lib/apiService';
import { SearchReservationSchema } from '@/schemas/favorite';

// search
export async function POST(request: Request) {
  const body = await request.json();

  // If the request body is invalid, return a 400 error with the validation errors
  const schemaTest = SearchReservationSchema.safeParse(body);
  if (!schemaTest.success) {
    const { errors } = schemaTest.error;
    return NextResponse.json(
      {
        errors: errors,
      },
      { status: 400 }
    );
  }

  const response =
    await apiService.favorite.favoriteControllerGetFavoriteListings(body);
  return NextResponse.json(
    {
      favorites: response.data,
    },
    { status: 200 }
  );
}
