'use client';
import { dislike, getLike, like } from '@/app/_service/firestore';
import { Recipe } from '@/app/type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from 'firebase/auth';
import styles from './like.module.scss';

const LikeButton = ({ item, user }: { item: Recipe; user: User | null }) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['like', item.RCP_SEQ],
    queryFn: () => getLike(item.RCP_SEQ),
  });

  const { mutate: likeRecipe } = useMutation({
    mutationFn: like,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['like', item.RCP_SEQ] }),
  });

  const { mutate: dislikeRecipe } = useMutation({
    mutationFn: dislike,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['like', item.RCP_SEQ] }),
  });

  const toggleLike = ({ item, userId }: { item: Recipe; userId: string }) => {
    if (data) {
      !data.like?.userId?.includes(userId)
        ? likeRecipe({
            recipe: {
              name: item.RCP_NM,
              category: item.RCP_PAT2,
              id: item.RCP_SEQ,
              thumbnailUrl: item.ATT_FILE_NO_MAIN,
            },
            userId,
          })
        : dislikeRecipe({ recipeId: item.RCP_SEQ, userId });
    } else {
      likeRecipe({
        recipe: {
          name: item.RCP_NM,
          category: item.RCP_PAT2,
          id: item.RCP_SEQ,
          thumbnailUrl: item.ATT_FILE_NO_MAIN,
        },
        userId,
      });
    }
  };

  return (
    <div className={styles.like}>
      <button disabled={!user ? true : false} onClick={() => user && toggleLike({ item, userId: user?.uid })}>
        <span>
          {user &&
            (data ? (
              data.like?.userId.includes(user.uid) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="#f43f5e">
                  <path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#f43f5e">
                  <g id="_01_align_center" data-name="01 align center">
                    <path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917ZM12,20.846c-3.253-2.43-10-8.4-10-12.879a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,7.967h2a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,7.967C22,12.448,15.253,18.416,12,20.846Z" />
                  </g>
                </svg>
              )
            ) : null)}
          {!user && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="#f43f5e">
              <path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z" />
            </svg>
          )}
          <b>{data ? data.like?.count : 0}</b>
        </span>
      </button>
    </div>
  );
};

export default LikeButton;
