import { NextResponse } from 'next/server';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_KEY}/${process.env.NEXT_PUBLIC_API_SERVICE_ID}/json`;

const option = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const index = url.searchParams.get('index');

  const response = await fetch(`${baseUrl}/${index}/${index}`, option);

  if (!response.ok) return new NextResponse('Not Found', { status: 404 });

  return response;
};
