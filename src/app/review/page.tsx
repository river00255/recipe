import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import ReviewForm from '../_components/ReviewForm';
import { getReview } from '../_service/firestore';
import ReviewList from '../_components/ReviewList';
import { ReviewKeys } from '../_service/keys';

const Review = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ReviewKeys.all,
    queryFn: () => getReview({ page: 1 }),
  });

  return (
    <div>
      <h3>요리 후기</h3>
      <ReviewForm />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ReviewList />
      </HydrationBoundary>
    </div>
  );
};

export default Review;
