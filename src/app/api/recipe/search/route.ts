import { NextResponse } from 'next/server';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_KEY}/${process.env.NEXT_PUBLIC_API_SERVICE_ID}/json`;

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const page = url.searchParams.get('page');
  const limit = url.searchParams.get('limit');
  const type = url.searchParams.get('type');
  const text = url.searchParams.get('text');

  let offset = (Number(page) - 1) * Number(limit);
  if (offset < 1) offset = 1;

  const apiUrl = `${baseUrl}/${offset}/${offset + Number(limit) - 1}/${type}=${text}`;

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) return new NextResponse('Not Found', { status: 404 });

  return response;
};
