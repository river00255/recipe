'use client';
import RecipeDetail from '@/app/_components/RecipeDetail';
import { getRecipeByName } from '@/app/_service';
import { handleManual } from '@/util';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

const RecipeByName = () => {
  const pathname = usePathname();
  const name = pathname.split('/')[2];

  const { data } = useQuery({
    queryKey: ['recipe', 'detail', name],
    queryFn: () => getRecipeByName(String(name)),
    enabled: !!name,
  });
  // console.log(data);

  return (
    <div>{data && data.row.length > 0 && <RecipeDetail recipe={data.row[0]} manual={handleManual(data.row[0])} />}</div>
  );
};

export default RecipeByName;
