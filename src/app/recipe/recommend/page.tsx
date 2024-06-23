'use client';
import { useAuth } from '@/app/_components/AuthProvider';
import RecipeDetail from '@/app/_components/RecipeDetail';
import { getRandomRecipe, getRecipe } from '@/app/_service';
import Loading from '@/app/loading';
import { getRandomNumber, handleManual } from '@/util';
import { getLocalStorage, setLocalStorage } from '@/util/persist';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

const Recommend = () => {
  const [index, setIndex] = useState(0);
  const savedIndex = getLocalStorage('index');

  const { user } = useAuth();

  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe'],
    queryFn: () => getRecipe({ page: 1, limit: 1 }),
    gcTime: 1000 * 60 * 60 * 1,
  });

  const { data } = useQuery({
    queryKey: ['recipe', 'recommend', index],
    queryFn: () => getRandomRecipe(index),
    enabled: index > 0,
    staleTime: 1000 * 60 * 60 * 1,
    gcTime: 1000 * 60 * 60 * 1,
  });

  const handleIndex = useCallback(
    (totalCount: number) => {
      const index = getRandomNumber(1, totalCount);
      setLocalStorage('index', { number: index, createdAt: new Date() });
      setIndex(index);
    },
    [recipe]
  );

  useEffect(() => {
    if (!savedIndex) {
      if (recipe) handleIndex(recipe.total_count);
    } else {
      if (Date.now() > new Date(savedIndex.createdAt).getTime() + 1000 * 60 * 60 * 1) {
        localStorage.removeItem('index');
        if (recipe) handleIndex(recipe.total_count);
      } else {
        const index = savedIndex.number;
        setIndex(index);
      }
    }
  }, [savedIndex]);

  return (
    <div>
      <h3>추천 레시피</h3>
      {isLoading && <Loading />}
      {data && data.row?.length > 0 && (
        <RecipeDetail recipe={data.row[0]} manual={handleManual(data.row[0])} user={user} />
      )}
    </div>
  );
};

export default Recommend;
