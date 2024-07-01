'use client';
import { useAuth } from '@/app/_components/AuthProvider';
import RecipeDetail from '@/app/_components/RecipeDetail';
import { getRandomRecipe, getRecipe } from '@/app/_service';
import { RecipeKeys } from '@/app/_service/keys';
import Loading from '@/app/loading';
import { getRandomNumber, handleManual } from '@/util';
import { getLocalStorage, setLocalStorage } from '@/util/persist';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

const Recommend = () => {
  const { user } = useAuth();

  const savedIndex: number | null = getLocalStorage('index');
  const createdAt: number | null = getLocalStorage('indexCreatedAt');

  const checkCreateTime = (createdAt: number | null) => {
    if (!createdAt) return false;
    if (Date.now() < createdAt + 1000 * 60 * 60 * 24) return true;
    localStorage.removeItem('index');
    localStorage.removeItem('indexCreatedAt');
    return false;
  };

  const getIndex = (totalCount: number) => {
    const index = getRandomNumber(1, totalCount);
    setLocalStorage('index', index);
    setLocalStorage('indexCreatedAt', Date.now());
    return index;
  };

  const { data: recipe1 } = useQuery({
    queryKey: RecipeKeys.recommend(),
    queryFn: () => getRecipe({ page: 1, limit: 1 }),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const index = useMemo(() => {
    if (!savedIndex) {
      return recipe1 ? getIndex(recipe1.total_count) : 0;
    } else {
      if (!checkCreateTime(createdAt)) return recipe1 ? getIndex(recipe1.total_count) : savedIndex;
      return savedIndex;
    }
  }, [savedIndex, createdAt, recipe1, checkCreateTime, getIndex]);

  const { data, isLoading } = useQuery({
    queryKey: RecipeKeys.recommend(index),
    queryFn: () => getRandomRecipe(index),
    enabled: index > 0,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });

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
