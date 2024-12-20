'use client';
import { useAuth } from '@/app/_components/AuthProvider';
import RecipeDetail from '@/app/_components/RecipeDetail';
import { getRecipeByName } from '@/app/_service';
import { RecipeKeys } from '@/app/_service/keys';
import Loading from '@/app/loading';
import { handleManual } from '@/util';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

const RecipeByName = () => {
  const pathname = usePathname();
  const name = pathname.split('/')[2];

  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: RecipeKeys.detail(name),
    queryFn: () => getRecipeByName(String(name)),
    enabled: !!name,
  });

  return (
    <div>
      {isLoading && <Loading />}
      {data && data.row.length > 0 && (
        <RecipeDetail recipe={data.row[0]} manual={handleManual(data.row[0])} user={user} />
      )}
    </div>
  );
};

export default RecipeByName;
