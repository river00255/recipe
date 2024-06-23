'use client';
import { useRouter, useSearchParams } from 'next/navigation';
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

  const router = useRouter();

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
    <div className={styles.search}>
      <div className={styles.title}>
        <h3>{`\' ${decodeURIComponent(String(queryString))} \'`} 검색 결과</h3>
        <button onClick={() => router.push('/')}>
          <svg width="21px" height="21px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Arrow / Arrow_Undo_Down_Left">
              <path
                id="Vector"
                d="M7 11L3 15M3 15L7 19M3 15H16C18.7614 15 21 12.7614 21 10C21 7.23858 18.7614 5 16 5H11"
                stroke="#525252"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </button>
      </div>
      <SearchForm />
      <div className={styles.list}>
        {data && data.row?.map((item, i) => <RecipePreview item={item} key={`${item.RCP_NM}_${i}`} />)}
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
