import { NextResponse } from 'next/server';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_KEY}/${process.env.NEXT_PUBLIC_API_SERVICE_ID}/json`;

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const name = url.pathname.split('/')[3];
  const response = await fetch(`${baseUrl}/1/1/RCP_NM=${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) return new NextResponse('Not Found', { status: 404 });

  return response;
};
