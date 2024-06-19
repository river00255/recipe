import { fetcher } from '@/util/fetcher';
import { Res } from '../type';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const serviceId = process.env.NEXT_PUBLIC_API_SERVICE_ID;

const baseUrl = `${apiUrl}${apiKey}/${serviceId}/json`;

const option = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

const searchRecipe = async ({
  type,
  text,
  page,
  limit,
}: {
  type: 'RCP_NM' | 'RCP_PARTS_DTLS';
  text: string;
  page: number;
  limit: number;
}) => {
  const url = `/api/recipe/search?page=${page}&limit=${limit}&type=${type}&text=${text}`;

  const response = await fetch(url, option);
  if (!response.ok) throw new Error('Failed to fetch Recipe.');

  const json = (await response.json()) as unknown as Res;
  return json.COOKRCP01;
};

const getRecipe = async ({ page, limit, category }: { page: number; limit: number; category?: string }) => {
  const url = !category
    ? `/api/recipe?page=${page}&limit=${limit}`
    : `/api/recipe?page=${page}&limit=${limit}&category=${category}`;

  const response = await fetch(url, option);
  if (!response.ok) throw new Error('Failed to fetch Recipe List.');

  const json = (await response.json()) as unknown as Res;
  return json.COOKRCP01;
};

const getRecipeByName = async (name: string) => {
  const response = await fetch(`/api/recipe/${name}`);
  if (!response.ok) throw new Error('Failed to fetch Recipe by name.');
  const json = (await response.json()) as unknown as Res;
  return json.COOKRCP01;
};

const getRandomRecipe = async (index: number) => {
  const response = await fetch(`/api/recipe/recommend?index=${index}`, option);
  const json = (await response.json()) as unknown as Res;
  return json.COOKRCP01;
};

export { searchRecipe, getRecipe, getRecipeByName, getRandomRecipe };
