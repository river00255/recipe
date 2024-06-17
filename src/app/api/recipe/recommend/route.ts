import { NextResponse } from 'next/server';
import { baseUrl } from '../route';

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

  if (!response.ok) return new NextResponse('Not Found', { status: 400 });

  return response;
};
