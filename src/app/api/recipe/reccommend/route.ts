import { Res } from '@/app/type';
import { NextResponse } from 'next/server';
import { baseUrl } from '../route';

const option = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

const getRandomIndex = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const GET = async (request: Request) => {
  const recipe = (await fetch(`${baseUrl}/1/1`, option)) as unknown as Res;
  const lastIndex = recipe.COOKRCP01.total_count;

  const index = getRandomIndex(1, lastIndex);

  const response = await fetch(`${baseUrl}/${index}/${index}`, option);

  if (!response.ok) return new NextResponse('Not Found', { status: 400 });

  return response;
};
