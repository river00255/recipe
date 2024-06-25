'use client';
import { getReview } from '@/app/_service/firestore';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styles from './reviewList.module.scss';
import Review from '../Review';
import Pagiantion from '../Pagination';

const pageLimit = 20;
const ReviewList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['review', currentPage],
    queryFn: () => getReview({ page: currentPage }),
  });
  console.log(data);

  return (
    <div className={styles.reviewList}>
      <div>{data && data.data.map((item) => <Review key={item.id} review={{ ...item, id: String(item.id) }} />)}</div>
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

export default ReviewList;
