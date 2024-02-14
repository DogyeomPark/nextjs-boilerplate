import { NextResponse } from 'next/server';

import { CreateListingSchema } from '@/schemas/listing';
import { auth } from '@/auth';
import { apiService } from '@/lib/apiService';

export async function POST(request: Request) {
  const session = await auth();
  const body = await request.json();

  // If the request body is invalid, return a 400 error with the validation errors
  const schemaTest = CreateListingSchema.safeParse(body);
  if (!schemaTest.success) {
    const { errors } = schemaTest.error;
    return NextResponse.json(
      {
        errors: errors,
      },
      { status: 400 }
    );
  }

  //
  const response = await apiService.listing.listingControllerAdd(body, {
    headers: {
      Authorization: 'Bearer ' + session?.user.accessToken ?? '',
    },
  });
  return NextResponse.json(
    {
      listing: response.data,
    },
    { status: 200 }
  );
}
