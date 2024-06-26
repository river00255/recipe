'use client';
import { getTopRatedLike, getTopRatedSearching } from '@/app/_service/firestore';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import styles from './ranking.module.scss';
import Link from 'next/link';

const Ranking = () => {
  const { data } = useQuery({
    queryKey: ['recipe', 'like', 'rank'],
    queryFn: () => getTopRatedLike(),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 30,
  });

  const { data: searchData } = useQuery({
    queryKey: ['search', 'rank'],
    queryFn: () => getTopRatedSearching(),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 30,
  });

  return (
    <div className={styles.ranking}>
      <div>
        <h4>&gt;&nbsp;인기 레시피</h4>
        {data?.map((item) => (
          <div key={item.recipe.id} className={styles.item}>
            <Link href={`/recipe/${encodeURIComponent(encodeURIComponent(item.recipe.name))}`}>
              <div className={styles.image}>
                <Image src={item.recipe.thumbnailUrl} alt={item.recipe.name} width={64} height={64} />
              </div>
              <p>{item.recipe.name}</p>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <h4>&gt;&nbsp;인기 검색어</h4>
        <ul>
          {searchData?.map((item) => (
            <li key={item.text}>
              <Link href={`/search?q=${encodeURIComponent(encodeURIComponent(item.text))}&type=RCP_NM`}>
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Ranking;
