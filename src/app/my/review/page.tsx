'use client';
import { useAuth } from '@/app/_components/AuthProvider';
import Review from '@/app/_components/Review';
import { getReviewByUser } from '@/app/_service/firestore';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styles from './myReview.module.scss';

const MyReview = () => {
  const { user } = useAuth();
  const userId = user ? user.uid : '';

  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['review', userId],
    queryFn: () => getReviewByUser({ userId, page: currentPage }),
  });
  // console.log(data);

  if (!user) return null;
  return (
    <div className={styles.myReview}>
      <span>나의 후기</span>
      <div className={styles.list}>
        {data &&
          data.totalElements > 0 &&
          data.data.map((item) => <Review key={item.id} review={{ ...item, id: String(item.id) }} />)}
      </div>
    </div>
  );
};

export default MyReview;
