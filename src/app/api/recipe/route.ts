import { NextResponse } from 'next/server';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const serviceId = process.env.NEXT_PUBLIC_API_SERVICE_ID;

export const baseUrl = `${apiUrl}${apiKey}/${serviceId}/json`;

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const page = url.searchParams.get('page');
  const limit = url.searchParams.get('limit');
  const category = url.searchParams.get('category');

  let offset = (Number(page) - 1) * Number(limit);
  if (offset < 1) offset = 1;

  const apiUrl = !category
    ? `${baseUrl}/${offset}/${offset + Number(limit) - 1}`
    : `${baseUrl}/${offset}/${offset + Number(limit) - 1}/RCP_PAT2=${category}`;

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) return new NextResponse('Not Found', { status: 400 });

  return response;
};
