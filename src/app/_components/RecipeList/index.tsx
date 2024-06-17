'use client';
import { getRecipe } from '@/app/_service';
import { useQuery } from '@tanstack/react-query';
import RecipePreview from '../RecipePreview';
import styles from './list.module.scss';
import { useSearchParams } from 'next/navigation';

const RecipeList = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('cat');

  const { data } = useQuery({
    queryKey: ['recipe', 'category', category],
    queryFn: () => getRecipe({ page: 1, limit: 20, ...(category && { category: String(category) }) }),
  });

  return (
    <div className={styles.list}>{data && data.row.map((item) => <RecipePreview item={item} key={item.RCP_NM} />)}</div>
  );
};

export default RecipeList;
