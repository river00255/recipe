'use client';
import RecipeDetail from '@/app/_components/RecipeDetail';
import { getRandomRecipe, getRecipe } from '@/app/_service';
import { getRandomNumber, handleManual } from '@/util';
import { getLocalStorage, setLocalStorage } from '@/util/persist';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

const Recommend = () => {
  const [index, setIndex] = useState(0);
  const savedIndex = getLocalStorage('index');

  const { data: recipe } = useQuery({
    queryKey: ['recipe'],
    queryFn: () => getRecipe({ page: 1, limit: 1 }),
    enabled: !savedIndex,
  });

  const { data } = useQuery({
    queryKey: ['recipe', 'recommend', index],
    queryFn: () => getRandomRecipe(index),
    enabled: index > 0,
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
      if (Date.now() > new Date(savedIndex.createdAt).getTime() + 1000 * 60 * 60 * 12) {
        localStorage.removeItem('index');
        if (recipe) handleIndex(recipe.total_count);
      }
      const index = savedIndex.number;
      setIndex(index);
    }
  }, [savedIndex]);

  return (
    <div>
      <h3>추천 레시피</h3>
      {data && data.row?.length > 0 && <RecipeDetail recipe={data.row[0]} manual={handleManual(data.row[0])} />}
    </div>
  );
};

export default Recommend;
