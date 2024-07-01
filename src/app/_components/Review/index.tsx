'use client';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './review.module.scss';
import Image from 'next/image';
import { deleteImage, getImagePath, saveImage } from '@/app/_service/file';
import { useAuth } from '../AuthProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RecipeReview } from '@/app/type';
import { deleteReview, updateReview } from '@/app/_service/firestore';
import ModalRoot from '../Modal/ModalRoot';
import useModal from '@/app/_hooks/useModal';
import Modal from '../Modal';
import ModalImage from '../Modal/ModalImage';
import { useSnackbar } from '../SnackbarProvider';
import { ReviewKeys } from '@/app/_service/keys';

const Review = ({ review }: { review: RecipeReview & { id: string } }) => {
  const { user } = useAuth();

  const { show } = useSnackbar();

  const { popup, openModal, closeModal } = useModal();

  const [isEdit, setIsEdit] = useState(false);

  const textRef = useRef<HTMLTextAreaElement>(null);
  const [image, setImage] = useState<{ url: string; name: string; file: File | null }>({
    url: '',
    name: '',
    file: null,
  });

  const queryClient = useQueryClient();

  const { mutate: edit } = useMutation({
    mutationFn: updateReview,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ReviewKeys.lists() }),
  });

  const { mutate: delReview } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ReviewKeys.lists() }),
  });

  const handleInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (image.url) URL.revokeObjectURL(image.url);
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        show('5mb 이하의 파일을 첨부해주세요.');
        return;
      }
      const url = URL.createObjectURL(file);
      setImage({ url, name: `${Date.now()}_${file.name}`, file });
    }
  };

  const deleteRecipeReview = (id: string, userId: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      delReview({ id, userId });
      setIsEdit(false);
    }
  };

  const editReview = async (id: string, userId: string) => {
    if (image.url.length < 1 && !image.file) {
      show('이미지를 추가하세요.');
      return;
    }
    if (image.file) {
      if (review.url !== image.url) {
        const path = getImagePath(review.url);
        deleteImage({ path, userId });
      }
      const url = await saveImage({ image: { file: image.file, name: image.name }, userId });
      const text = textRef.current?.value.trim() ?? review.text;
      if (url) {
        edit({ id, url, text, userId });
        URL.revokeObjectURL(image.url);
        setImage({ url, name: '', file: null });
        setIsEdit(false);
        return;
      }
    }
    const text = textRef.current?.value.trim() ?? review.text;
    edit({ id, url: review.url, text, userId });
    setIsEdit(false);
  };

  useEffect(() => {
    if (review.url.length > 0) setImage((prev) => ({ ...prev, url: review.url }));
  }, []);

  return (
    <>
      <div className={!isEdit ? `${styles.review}` : `${styles.review} ${styles.active}`}>
        <textarea
          defaultValue={review.text || ''}
          ref={textRef}
          readOnly={!isEdit ? true : false}
          maxLength={300}
          rows={7}
        />
        <div className={styles.image}>
          {image.url.length > 0 && (
            <>
              <Image src={image.url} alt={String(review.id)} width={90} height={90} onClick={() => openModal()} />
              {isEdit && (
                <button
                  hidden={user && user.uid === review.userId ? false : true}
                  className={styles.del}
                  onClick={() => setImage({ url: '', name: '', file: null })}>
                  <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289Z"
                      fill="#525252"
                    />
                  </svg>
                </button>
              )}
            </>
          )}
          {user && user.uid === review.userId && isEdit && (
            <label className={styles.input}>
              <span>+</span>
              <input type="file" accept="image/*" onChange={(e) => handleInputFile(e)} />
            </label>
          )}
        </div>
        <Modal isOpen={popup} close={closeModal}>
          <ModalImage src={image.url} name={String(review.id)} width={320} height={320} />
        </Modal>
        {user && user.uid === review.userId && (
          <div className={styles.buttons}>
            {!isEdit ? (
              <button onClick={() => setIsEdit(true)}>수정</button>
            ) : (
              <>
                <button onClick={() => editReview(review.id, user.uid)}>수정</button>
                <button onClick={() => deleteRecipeReview(review.id, user.uid)}>삭제</button>
                <button
                  onClick={() => {
                    setImage({ url: review.url, name: '', file: null });
                    if (textRef.current) textRef.current.value = review.text;
                    setIsEdit(false);
                  }}>
                  닫기
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <ModalRoot />
    </>
  );
};

export default Review;
