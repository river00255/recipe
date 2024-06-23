'use client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../_components/AuthProvider';
import { getLikeByUserId } from '../_service/firestore';
import styles from './my.module.scss';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const pageLimit = 10;
const MyPage = () => {
  const { user } = useAuth();
  const userId = user ? user.uid : '';

  const [currentpage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['recipe', 'like', userId, currentpage],
    queryFn: () => getLikeByUserId({ userId: userId, page: currentpage }),
    enabled: !!user,
  });
  console.log(data);

  if (!user) return null;
  return (
    <div className={styles.myPage}>
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 24 24" width="21" height="21" fill="#f43f5e">
          <path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z" />
        </svg>
        &nbsp;&nbsp;
        <span>레시피</span>
      </span>
      <div className={styles.list}>
        {data &&
          data.likes?.map((item) => (
            <div key={item.recipe.id} className={styles.item}>
              <Link href={`/recipe/${encodeURIComponent(encodeURIComponent(item.recipe.name))}`}>
                <div className={styles.image}>
                  <Image src={item.recipe.thumbnailUrl} alt={item.recipe.name} width={80} height={80} />
                </div>
                <span>{item.recipe.name}</span>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyPage;
