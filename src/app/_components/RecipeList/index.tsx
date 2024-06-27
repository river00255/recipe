'use client';
import { getRecipe } from '@/app/_service';
import { useQuery } from '@tanstack/react-query';
import RecipePreview from '../RecipePreview';
import styles from './list.module.scss';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Pagiantion from '../Pagination';
import Loading from '@/app/loading';
import usePageMarker from '@/app/_hooks/usePageMarker';

const pageLimit = 20;
const RecipeList = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('cat');

  const listRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const { markedPage } = usePageMarker();

  const { data, isLoading } = useQuery({
    queryKey: ['recipe', 'category', category, currentPage],
    queryFn: () => getRecipe({ page: currentPage, limit: pageLimit, ...(category && { category: String(category) }) }),
  });

  useEffect(() => {
    if (markedPage) {
      markedPage !== currentPage && setCurrentPage(markedPage);
    } else {
      setCurrentPage(1);
    }
  }, [markedPage]);

  useEffect(() => {
    currentPage > 1 && listRef.current && listRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [currentPage]);

  return (
    <>
      <div className={styles.list} ref={listRef}>
        {isLoading && <Loading />}
        {data && data.row?.map((item) => <RecipePreview item={item} key={item.RCP_NM} />)}
      </div>
      {data && data.total_count > 0 && (
        <Pagiantion
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={pageLimit}
          totalElement={data.total_count}
        />
      )}
    </>
  );
};

export default RecipeList;
