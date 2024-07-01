'use client';
import { useAuth } from '@/app/_components/AuthProvider';
import Review from '@/app/_components/Review';
import { getReviewByUserId } from '@/app/_service/firestore';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styles from './myReview.module.scss';
import Pagiantion from '@/app/_components/Pagination';
import { ReviewKeys } from '@/app/_service/keys';

const pageLimit = 20;
const MyReview = () => {
  const { user } = useAuth();
  const userId = user ? user.uid : '';

  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ReviewKeys.filteredList(userId, currentPage),
    queryFn: () => getReviewByUserId({ userId, page: currentPage }),
  });

  if (!user) return null;
  return (
    <div className={styles.myReview}>
      <span>나의 후기</span>
      <div className={styles.list}>
        {data && data.totalElements < 1 && <div className={styles.message}>아직 작성한 글이 없습니다.</div>}
        {data &&
          data.totalElements > 0 &&
          data.data.map((item) => <Review key={item.id} review={{ ...item, id: String(item.id) }} />)}
      </div>
      {data && data.totalElements > 0 && (
        <Pagiantion
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={pageLimit}
          totalElement={data.totalElements}
        />
      )}
    </div>
  );
};

export default MyReview;
