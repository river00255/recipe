'use client';
import { useSearchParams } from 'next/navigation';
import SearchForm from '../_components/SearchForm';
import { useQuery } from '@tanstack/react-query';
import { searchRecipe } from '../_service';
import RecipePreview from '../_components/RecipePreview';
import styles from './search.module.scss';
import { useEffect, useState } from 'react';
import Pagiantion from '../_components/Pagination';

const pageLimit = 20;
const Search = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const queryString = searchParams.get('q');

  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['recipe', 'search', type, queryString, currentPage],
    queryFn: () =>
      searchRecipe({
        type: String(type) as 'RCP_NM' | 'RCP_PARTS_DTLS',
        text: decodeURIComponent(String(queryString)),
        page: currentPage,
        limit: 20,
      }),
    enabled: !!type && !!queryString,
  });
  // console.log(data);

  useEffect(() => {
    setCurrentPage(1);
  }, [type, queryString]);

  return (
    <div>
      <h3>{`\' ${decodeURIComponent(String(queryString))} \'`} 검색 결과</h3>
      <button>←</button>
      <SearchForm />
      <div className={styles.list}>
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
    </div>
  );
};

export default Search;
