import axios from 'axios';
import { NextResponse } from 'next/server';

import { ReserveSchema } from '@/schemas/reservation';

export async function POST(request: Request) {
  const body = await request.json();

  //
  const schemaTest = ReserveSchema.safeParse(body);
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
  const response = await axios.post(
    `${process.env.NEXT_API_URL}/reservation`,
    body
  );

  return NextResponse.json(
    {
      user: response.data.user,
    },
    { status: 200 }
  );
}
