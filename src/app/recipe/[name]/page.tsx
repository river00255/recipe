'use client';
import { getRecipeByName } from '@/app/_service';
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
  console.log(data);

  return <div>{data && data.row.length > 0 && <div>{data.row[0].RCP_NM}</div>}</div>;
};

export default RecipeByName;
