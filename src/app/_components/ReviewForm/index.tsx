'use client';
import { ChangeEvent, useRef, useState } from 'react';
import styles from './reviewForm.module.scss';
import Image from 'next/image';
import { saveImage } from '@/app/_service/file';
import { useAuth } from '../AuthProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addReview } from '@/app/_service/firestore';
import { useSnackbar } from '../SnackbarProvider';

const ReviewForm = () => {
  const { user } = useAuth();

  const { show } = useSnackbar();

  const textRef = useRef<HTMLTextAreaElement>(null);
  const [image, setImage] = useState<{ url: string; name: string; file: File | null }>({
    url: '',
    name: '',
    file: null,
  });

  const queryClient = useQueryClient();

  const { mutate: write } = useMutation({
    mutationFn: addReview,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['review'],
      }),
  });

  const handleInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (image.url.length > 0) URL.revokeObjectURL(image.url);
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

  const writeReview = async (userId: string) => {
    if (!image.file && !textRef.current) return;
    if (image.file) {
      const url = await saveImage({ image: { file: image.file, name: image.name }, userId });
      const text = textRef.current ? textRef.current.value.trim() : '';
      if (url) write({ url, text, userId, createdAt: new Date() });
      URL.revokeObjectURL(image.url);
      setImage({ url: '', name: '', file: null });
      if (textRef.current) textRef.current.value = '';
      return;
    }
    if (!textRef.current || textRef.current.value.trim().length < 1) return;
    const text = textRef.current.value.trim();
    write({ url: '', text, userId, createdAt: new Date() });
    textRef.current.value = '';
  };

  if (!user) return null;
  return (
    <div className={styles.reviewForm}>
      <label>
        <div className={image.url.length > 0 ? `${styles.active}` : ''}>
          {image.url.length > 0 ? (
            <Image src={image.url} alt={image.name} width={80} height={80} />
          ) : (
            <svg width="48px" height="48px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g id="Complete">
                <g data-name="add" id="add-2">
                  <g>
                    <line
                      fill="none"
                      stroke="#d4d4d4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="12"
                      x2="12"
                      y1="19"
                      y2="5"
                    />
                    <line
                      fill="none"
                      stroke="#d4d4d4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="5"
                      x2="19"
                      y1="12"
                      y2="12"
                    />
                  </g>
                </g>
              </g>
            </svg>
          )}
        </div>
        <input type="file" accept="image/*" onChange={(e) => handleInputFile(e)} />
      </label>
      <textarea maxLength={300} ref={textRef} placeholder="300자 이내" rows={4} />
      <button onClick={() => writeReview(user.uid)}>
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.3785 8.44975L11.4637 15.3647C11.1845 15.6439 10.8289 15.8342 10.4417 15.9117L7.49994 16.5L8.08829 13.5582C8.16572 13.1711 8.35603 12.8155 8.63522 12.5363L15.5501 5.62132M18.3785 8.44975L19.7927 7.03553C20.1832 6.64501 20.1832 6.01184 19.7927 5.62132L18.3785 4.20711C17.988 3.81658 17.3548 3.81658 16.9643 4.20711L15.5501 5.62132M18.3785 8.44975L15.5501 5.62132"
            stroke="#737373"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M5 20H19" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

export default ReviewForm;
