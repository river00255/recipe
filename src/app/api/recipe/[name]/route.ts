import { NextResponse } from 'next/server';
import { baseUrl } from '../route';

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
