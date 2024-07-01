import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import styles from './recipe.module.scss';
import { getRecipe } from '../_service';
import RecipeList from '../_components/RecipeList';
import Category from '../_components/Category';
import { Suspense } from 'react';
import Loading from '../loading';
import { RecipeKeys } from '../_service/keys';

const Recipe = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: RecipeKeys.lists(),
    queryFn: () => getRecipe({ page: 1, limit: 20 }),
  });

  return (
    <div>
      <h3>종류별 보기</h3>
      <div className={styles.category}>
        <Category />
      </div>
      <Suspense fallback={<Loading />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <RecipeList />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
};

export default Recipe;
