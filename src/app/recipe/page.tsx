import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import styles from './recipe.module.scss';
import { getRecipe } from '../_service';
import RecipeList from '../_components/RecipeList';
import Category from '../_components/Category';

const Recipe = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['recipe', 'category'],
    queryFn: () => getRecipe({ page: 1, limit: 10 }),
  });

  return (
    <div>
      <h3>종류별 보기</h3>
      <div className={styles.category}>
        <Category />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RecipeList />
      </HydrationBoundary>
    </div>
  );
};

export default Recipe;
